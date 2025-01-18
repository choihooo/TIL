import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'public', 'images');

const convertToWebP = async (inputPath) => {
  // 입력 파일 경로에서 확장자를 제거하고 '.webp'를 추가
  const outputPath = path.join(path.dirname(inputPath), path.basename(inputPath, path.extname(inputPath)) + '.webp');

  try {
    await sharp(inputPath)
      .toFormat('webp')
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`Converted and saved: ${outputPath}`);

    // 원본 파일 삭제
    await fs.unlink(inputPath);
    console.log(`Original file deleted: ${inputPath}`);

  } catch (error) {
    console.error('Error converting or deleting image:', error);
  }
};

const traverseDirectory = async (dir) => {
  const promises = []; // 비동기 작업을 관리할 프로미스 배열

  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    for (const file of files) {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        promises.push(traverseDirectory(filePath)); // 폴더면 재귀적으로 탐색
      } else if (file.isFile() && path.extname(filePath).toLowerCase() !== '.webp') {
        promises.push(convertToWebP(filePath)); // 웹피 파일이 아니면 변환 처리
      }
    }

    await Promise.all(promises); // 모든 비동기 작업이 완료될 때까지 대기
  } catch (error) {
    console.error('Error scanning directory:', error);
  }
};

traverseDirectory(directoryPath).then(() => {
  console.log('All conversions completed.'); // 모든 변환이 완료되면 메시지 출력
}).catch(error => {
  console.error('Error during image conversion process:', error);
});
