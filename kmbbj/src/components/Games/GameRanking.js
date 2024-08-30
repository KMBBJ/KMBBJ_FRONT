import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { gameService } from '../../../services/gameService';

const GameRankings = () => {
  const { encryptedGameId } = useParams();
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRankings();
    }
  }, [isOpen, encryptedGameId]);

  const fetchRankings = async () => {
    if (!encryptedGameId) {
      setError("Game ID is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await gameService.getRoundRankings(encryptedGameId);
      setRankings(response.data);
    } catch (error) {
      console.error("Failed to fetch rankings:", error);
      setError("Failed to load rankings");
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>중간 순위 보기</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>게임 중간 순위</DialogTitle>
          {loading && <p>순위를 불러오는 중...</p>}
          {error && <p>오류: {error}</p>}
          {!loading && !error && rankings.map((roundRankings, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">라운드 {index + 1}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>순위</TableHead>
                    <TableHead>닉네임</TableHead>
                    <TableHead>수익/손실</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roundRankings.map((ranking) => (
                    <TableRow key={ranking.user}>
                      <TableCell>{ranking.rank}</TableCell>
                      <TableCell>{ranking.user}</TableCell>
                      <TableCell className={parseInt(ranking.profit) > parseInt(ranking.loss) ? 'text-green-600' : 'text-red-600'}>
                        {parseInt(ranking.profit) > parseInt(ranking.loss)
                          ? formatMoney(ranking.profit)
                          : '-' + formatMoney(ranking.loss)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GameRankings;