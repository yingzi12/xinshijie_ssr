import pica from "pica";
import { useQuasar } from 'quasar';

export function tansParams(params: { [x: string]: any; }) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        const params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}
export function compressIfNeeded(file) {
  if (file.size > 500 * 1024) {
    return compressImage(file).catch(error => {
      console.error('Compression failed', error);
      return file;
    });
  } else {
    return file;
  }
}

export  function compressIfNeededBatch(files: FileList): File[] {
  const processedFiles: File[] = []; // 用于存储处理后的文件

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.size > 500 * 1024) {
      // 尝试压缩文件并处理可能的错误
      try {
        const compressedFile =  compressImage(file);
        processedFiles.push(compressedFile);
      } catch (error) {
        console.error('Compression failed for', file.name, error);
        // 如果压缩失败，仍然将原始文件加入列表
        processedFiles.push(file);
      }
    } else {
      // 直接添加小于等于指定大小的文件
      processedFiles.push(file);
    }
  }

  // 所有文件处理完毕后，返回处理后的文件列表
  return processedFiles;
}

// 压缩图片的函数
export function compressImage(file) {
  // console.log("---------compressImage---------------");
  const picaInstance = pica();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let targetWidth = img.width;
        let targetHeight = img.height;
        if (img.width > 1920) {
          targetWidth = 1920;
          targetHeight = (img.height / img.width) * 1920;
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        picaInstance.resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2
        })
          .then(resizedCanvas => picaInstance.toBlob(resizedCanvas, 'image/jpeg', 0.8))
          .then(blob => {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          })
          .catch(error => {
            reject(error);
          });
      };
      img.onerror = () => reject(new Error('Image load error'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('FileReader error'));
    reader.readAsDataURL(file);
  });
}
export function getImageUrl(imgUrl) {
  const $q = useQuasar();
  // Ensure imgUrl is not null or undefined before appending
  if (imgUrl) {
    return `${$q.config.sourceWeb}${imgUrl}`;
  }
  // If imgUrl is not provided or is falsy, return the default empty image path directly
  return '/empty.jpg';
}

export function timeDifference(dateString) {
  const datePattern = /(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/;
  const match = dateString.match(datePattern);

  if (!match) {
    return 'Invalid date format';
  }

  const date = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
  const now = new Date();

  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return dateString;
  } else if (days > 0) {
    return days + ' day(s)';
  } else if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return hours + ' hour(s) ' + remainingMinutes + ' minute(s)';
  } else {
    return minutes + ' minute(s)';
  }
}

export function formattedNowDateTime() {
  const now = new Date();

  // 获取年、月、日、时、分、秒，并补零
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // 拼接成目标格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

console.log(timeDifference('2022-03-01 12:00:00'));
