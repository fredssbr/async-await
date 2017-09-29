const users = [{
    id: 1,
    name: 'Fred',
    schoolId: 101
}, {
    id: 2,
    name: 'Obi Wan',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId))
    });
};

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average}% in the class.`;
        console.log(average);
    })
};

/*

Async functions always returns a promise (it resolves what you return into a promise)
It's equivalent to: 

    () => {
        return new Promise((resolve, reject) => {
            resolve('Mike');
        })
    }

Throwing an error is the equivalent to reject('This is an error.')

    throw new Error('This is an error');

You can only use await inside an async function. There is no top level (global) use
for await, like this:

    const status = await getStatusAlt(2);

*/
const getStatusAlt = async(userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});