export const SuperScript = ({ sourceID }: { sourceID: string }) => {
  return (
    <sup
      className="cursor-pointer align-super text-xs font-normal hover:text-harrierBLUE"
      onClick={() => console.log("open modal!")}
    >
      {sourceID}
    </sup>
  );
};
