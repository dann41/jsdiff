const {diff} = require('./diff');

test('diff beween 1 and 2 returns an update detection', () => {
    expect(diff(1, 2)).toStrictEqual({
        type: 'updated',
        from: 1,
        to: 2
    });
});

test('diff beween 1 and 1 returns no diff', () => {
    expect(diff(1, 1)).toStrictEqual({});
});

test('diff beween 1 and undefined returns a removed detection', () => {
    expect(diff(1, undefined)).toStrictEqual({
        type: 'removed',
        from: 1,
        to: undefined
    });
});

test('diff beween undefined and 1 returns an added detection', () => {
    expect(diff(undefined, 1)).toStrictEqual({
        type: 'added',
        from: undefined,
        to: 1
    });
});

test('diff beween 1 and null returns a removed detection', () => {
    expect(diff(1, null)).toStrictEqual({
        type: 'removed',
        from: 1,
        to: null
    });
});

test('diff beween null and 1 returns an added detection', () => {
    expect(diff(null, 1)).toStrictEqual({
        type: 'added',
        from: null,
        to: 1
    });
});

test('diff beween undefined and undefined returns no diff', () => {
    expect(diff(undefined, undefined)).toStrictEqual({});
});

test('diff beween null and null returns no diff', () => {
    expect(diff(null, null)).toStrictEqual({});
});

test('diff beween undefined and null returns no diff', () => {
    expect(diff(undefined, null)).toStrictEqual({});
});

test('diff beween undefined and null returns no diff', () => {
    expect(diff(undefined, null)).toStrictEqual({});
});

test('diff beween empty objects returns no diff', () => {
    expect(diff({}, {})).toStrictEqual({});
});

test('diff beween two objects returns expected result', () => {
    expect(
        diff(
            {aa: 9, a: 1, b: 'hola', item: { item1: 12 }}, 
            {aa: 9, a: 2, c: 'que tal', item: { item1: 12 }}
        )
    ).toStrictEqual({
        a: {
            type: 'updated',
            from: 1,
            to: 2 
        },
        b: {
            type: 'removed',
            from: 'hola',
            to: undefined
        },
        c: {
            type: 'added',
            from: undefined,
            to: 'que tal'
        }
    });
});

test('diff beween two different arrays returns expected result', () => {
    expect(
        diff(
            [1, 2, 5, 1], 
            [2, 3, 5]
        )
    ).toStrictEqual({
        0: {
            type: 'updated',
            from: 1,
            to: 2
        },
        1: {
            type: 'updated',
            from: 2,
            to: 3
        },
        3: {
            type: 'removed',
            from: 1,
            to: undefined
        }
    });
});
