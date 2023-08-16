interface fileType {
  size: number;
  type: string;
}

export function checkIfFilesAreTooBig(files?: any[] | any | null | undefined): boolean {
  let valid = true;
  if (files && files.length > 0) {
    const listFile: fileType[] = [];
    listFile.push({ size: files["0"].size as number, type: files["0"].type as string });
    listFile.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}

export function checkIfFilesAreCorrectType(files?: any[] | any | null | undefined): boolean {
  let valid = true;
  if (files && files.length > 0) {
    const listFile: fileType[] = [];
    listFile.push({ size: files["0"].size as number, type: files["0"].type as string });
    listFile.map((file) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}
