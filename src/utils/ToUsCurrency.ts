export default (dollars: number): string => {
    return dollars.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
};
