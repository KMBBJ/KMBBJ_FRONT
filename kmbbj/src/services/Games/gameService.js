import api from "../../api/api";

export const gameService = {
  startGame: async (data) => {
    try {
      const response = await api.post(`/games/start/${data}`);
      
      const gameId = response.data?.data?.gameId || response.data?.gameId;

      if (!gameId) {
        throw new Error('유효한 게임 ID를 받지 못했습니다.');
      }

      return gameId;
    } catch (error) {
      throw error;
    }
  },
};
