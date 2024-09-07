# Jenkins 베이스 이미지 설정
FROM jenkins/jenkins:lts

# 루트 사용자로 전환하여 패키지 설치
USER root

# 필수 패키지 업데이트 및 설치
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# Docker GPG 키 추가 및 Docker 저장소 설정
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"

# Docker 설치
RUN apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io

# Docker 실행을 위한 권한 설정
RUN usermod -aG docker jenkins

# Node.js 20.x 설치를 위한 패키지 설정
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Node.js와 npm 버전 확인 (디버깅용)
RUN node -v && npm -v

# 기타 필요한 패키지 설치 (git 포함)
RUN apt-get update && \
    apt-get install -y git

# Jenkins 사용자로 다시 전환
USER jenkins

# Jenkins 홈 디렉토리를 볼륨으로 마운트
VOLUME ["/var/jenkins_home"]