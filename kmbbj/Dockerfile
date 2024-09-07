# Node.js 20 이미지 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# React 개발 서버 실행
CMD ["npm", "start"]

# 포트 3000을 외부에 노출
EXPOSE 3000