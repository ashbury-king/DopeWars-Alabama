export default (arr: number[]): number[] => {
    if (arr.length === 0) return arr;
    const copyArr: number[] = [];
    arr.forEach(element => {
        copyArr.push(element);
    });
    return copyArr.sort().filter((_, i) => i);
};
