const models = require('../models');


async function test(req, res) {

    //one to one 1:1
    //one to many 1:m
    //many to many m:n


    //   //one to one------------------
    // const user = await models.User.findByPk(19,{
    //   include: [models.Address]

    // });

    // const address = await models.Address.findByPk(1,{
    //   include: [models.User]
    // });

    // //one to many------------
    // const user = await models.User.findByPk(19,{
    //     include: [models.Post]
    //     });

    //many to many----------------
    // const post = await models.Post.findByPk(4,{
    //     include: [models.Category]
    // }); 

    // const category = await models.Category.findByPk(4,{
    //     include: [models.Post]
    // });


    //many to many student with course for couse entrollment

    // const student = await models.Student.findByPk(1, {
    //     include: [models.Course]
    // });

    // const course = await models.Course.findByPk(1, {
    //     include: [models.Student]
    // });

    // //one to many user with attendance
    // const user = await models.User.findByPk(1, {
    //     include: [models.Attendance]
    // });

    // const Attendance = await models.Attendance.findByPk(41, {
    //     include: [models.User]
    // });

    //one(RoleIncome) to many(User)
    // const RoleIncome = await models.RoleIncome.findByPk(1, {
    //     include: [models.User]
    // });

    // const User = await models.User.findByPk(1, {
    //     include: [models.RoleIncome]
    // });

    //one(RoleIncome:id) to many(BasicSalary:roleId)
    // const RoleIncome = await models.RoleIncome.findByPk(6, {
    //     include: [models.BasicSalary]
    // });

    // const BasicSalary = await models.BasicSalary.findByPk(6, {
    //     include: [models.RoleIncome]
    // });

    // one(BudgetedAllowance table:id) to many(Earning table: baValue )

    //one(BasicSalary table:userId) to one(Earning table:userId)
    // const user = await models.BasicSalary.findByPk(1, {
    //     include: [models.Earning]
    // });

     //one(User:userId) to many(UserTotalLoan:userId)
    // const user = await models.User.findByPk(1, {
    //     include: [models.UserTotalLoan]
    // });

    // const UserTotalLoan = await models.UserTotalLoan.findByPk(1, {
    //     include: [models.User]
    // });

      //one(UserMonthLoan:userId) to many(UserTotalLoan:userId)
    // const UserMonrhLoan = await models.UserMonrhLoan.findByPk(1, {
    //     include: [models.UserTotalLoan]
    // });

    // const UserTotalLoan = await models.UserTotalLoan.findByPk(1, {
    //     include: [models.UserMonrhLoan]
    // });


      


    res.status(200).json({
        //    data : user,
        //    data : address,
        //  data : user
        // data : post
        // data : category

        //---------------studenet with courese - entollment
        // data: student
        // data: course

        //one to many user with attendance
        // data: user
        // data: Attendance

        //one(RoleIncome) to many(User)
        // data: RoleIncome
        // data: User

        //one(RoleIncome:id) to many(BasicSalary:roleId)
        // data: RoleIncome
        // data: BasicSalary

        // one(BudgetedAllowance table:id) to many(Earning table: baValue )

        //one(BasicSalary table:userId) to one(Earning table:userId)
        // data: user

         //one(User:userId) to many(UserTotalLoan:userId)
        // data: user
        // data: UserTotalLoan

          //one(UserMonthLoan:userId) to many(UserTotalLoan:userId)
        // data: UserMonrhLoan
        // data: UserTotalLoan

    });
}



module.exports = {
    test: test
} 
