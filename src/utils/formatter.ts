function Formatter(value: number): string
{
    const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    let index = 0;

    while (value >= 1000 && index < suffixes.length - 1)
    {
        value /= 1000;
        index++;
    }

    return value.toFixed(2).replace(/\.0*$/, '') + suffixes[index];
}

export default Formatter;