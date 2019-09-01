
export const parseSourcePos = sourcePos => {
  const firstDoubleDotIdx = sourcePos.indexOf(":");
  const startLineNum = parseInt(sourcePos.slice(0, firstDoubleDotIdx));
  const secondDoubleDotIdx = sourcePos.indexOf(":", firstDoubleDotIdx + 1);
  const dashIdx = sourcePos.indexOf("-");
  const endLineNum = parseInt(sourcePos.slice(dashIdx + 1, secondDoubleDotIdx));

  return { startLineNum, endLineNum };
};

