const interpolate = (value, session = {}, options = {}) => {
    let leftDelimiter = options.leftDelimiter;
    let rightDelimiter = options.rightDelimiter;

    if(leftDelimiter !== "" && rightDelimiter !== "" && value.includes(leftDelimiter) && value.includes(rightDelimiter)) {
        const matcher = new RegExp(`${leftDelimiter}(.*?)${rightDelimiter}`,'gm');
        const normalise = (str) => str.slice(leftDelimiter.length, rightDelimiter.length*-1);
        let words = value.match(matcher).map(normalise);

        for(let j = 0; j < words.length; j++) {
            value = value.replace(leftDelimiter, "").replace(rightDelimiter, "");
            if(Object.keys(session).length === 0) {
                value = value.replace(words[j], "");
            } else {
                value = value.replace(words[j], session[words[j]]);
            }
        }
    }


    return value;
};

module.exports = { interpolate }