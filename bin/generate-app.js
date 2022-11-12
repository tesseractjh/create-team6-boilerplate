#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('프로젝트 이름을 입력해야 합니다!');
  console.log('[예시] npx create-team6-boilerplate project-name');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = 'https://github.com/tesseractjh/create-team6-boilerplate';

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(projectName);
      console.log(`${projectName} 폴더가 이미 존재합니다. 다른 이름으로 시도해주세요.`);
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log('파일 다운로드중...');
    execSync(`git clone --depth=1 ${GIT_REPO} ${projectPath}`);

    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    console.log('의존성 설치중...');
    execSync('npm install');

    console.log('불필요한 파일 제거 중...');
    execSync('npx rimraf ./.git');

    console.log('설치가 완료되었습니다!');
  } catch (error) {
    console.log(error);
  }
}

main();
