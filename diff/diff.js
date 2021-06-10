function isNullOrUndefined(element) {
    return element === null || element === undefined
}

function isSimpleElement(element) {
    return typeof element !== 'object'
}

function isEmptyObject(object) {
    return object && Object.keys(object).length === 0 
}

function config(excludeSame) {
    return {
        excludeSame: excludeSame
    }
}

function diff(a, b, diffConfig = config(true)) {
    var isEmptyA = isNullOrUndefined(a)
    var isEmptyB = isNullOrUndefined(b)

    if (a === b || (isEmptyA && isEmptyB)) {
        if (diffConfig.excludeSame) {
            return {}
        }
        return {
            type: 'same',
            from: a,
            to: b
        }
    }

    if (!isEmptyA && isEmptyB) {
        return {
            type: 'removed',
            from: a,
            to: b
        }
    }

    if (isEmptyA && !isEmptyB) {
        return {
            type: 'added',
            from: a,
            to: b
        }
    }

    // Finish if one of the two are simple
    if (isSimpleElement(a) || isSimpleElement(b)) {
        return {
            type: 'updated',
            from: a,
            to: b
        }
    }

    if (isEmptyObject(a) && isEmptyObject(b)) {
        if (diffConfig.excludeSame) {
            return {}
        }
        return {
            type: 'same',
            from: a,
            to: b
        }
    }

    // Both are objects, recursive
    var propsDiff = {}
    var comparedProperties = []
    // first compare properties in A against B
    Object.keys(a).forEach(function(key,index) {
        var propDiff = diff(a[key], b[key], diffConfig)
        if (!isEmptyObject(propDiff) || !diffConfig.excludeSame) {
            propsDiff[key] = propDiff
        }
        comparedProperties.push(key)
    });

    // then compare properties in B not in A
    Object.keys(b).forEach(function(key,index) {
        if (!comparedProperties.includes(key)) {
            var propDiff = diff(undefined, b[key], diffConfig)
            if (!isEmptyObject(propDiff) || !diffConfig.excludeSame) {
                propsDiff[key] = propDiff
            }
        }
    });

    return propsDiff
}

module.exports = {
    diff: diff,
    config: config
}