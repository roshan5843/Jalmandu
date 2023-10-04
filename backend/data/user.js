import bcrypt from 'bcryptjs';

const users=[
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true,
    },
    {
        name: 'bibek gupta',
        email: 'bibekgupta@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
    {
        name: 'roshan yadav',
        email: 'roshanyadav@gmail.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: false,
    },
];

export default users;