const express = require('express');
const salaryController = require('../controllers/salary.controller');

const router = express.Router();

router.post('/addroleincome', salaryController.rsave);
router.get('/showallroleincome', salaryController.rshow);
router.get('/showroleincome/:tableId', salaryController.ridshow);
router.put('/updateroleincome/:tableId', salaryController.rupdate);
router.delete('/deleteroleincome/:tableId', salaryController.rdestroy);
router.post('/addsalary', salaryController.bssalaryAll);
//MonthAttempCount
router.post('/addmonthattempcount', salaryController.MonthAttempCount);
//MonthAttempCountShow
router.get('/showmonthattempcount', salaryController.MonthAttempCountShow);


router.get('/showallsalary', salaryController.bsshow);


//add BudgetedAllowance
router.post('/addbudgetedallowance', salaryController.basave);
//show BudgetedAllowance
router.get('/showbudgetedallowance', salaryController.bashow);
//show BudgetedAllowance by id
router.get('/showbudgetedallowance/:tableId', salaryController.baIdshow);
//update BudgetedAllowance
router.put('/updatebudgetedallowance/:tableId', salaryController.baupdate);
//delete BudgetedAllowance
router.delete('/deletebudgetedallowance/:tableId', salaryController.badelete);
//add Earning
router.post('/addearning', salaryController.earningcal);
//show Earning
router.get('/showearning', salaryController.earningShow);
//creat function to auto add data UserTotalLoan table  User(userId, name) data
router.post('/savesertotalloan', salaryController.SaveUserTotalLoan);
// add data to UserTotalLoan table
router.post('/addusertotalloan', salaryController.AddUserTotalLoan);
// show data from UserTotalLoan table
router.get('/showusertotalloan', salaryController.ShowUserTotalLoan);
// show data from UserTotalLoan table by id
router.get('/showusertotalloan/:tableId', salaryController.ShowUserTotalLoanById);
// update data from UserTotalLoan table
router.put('/updateusertotalloan/:tableId', salaryController.UpdateUserTotalLoan);
// delete data from UserTotalLoan table
router.delete('/deleteusertotalloan/:tableId', salaryController.DeleteUserTotalLoan);
// autp add data to UserMonrhLoan table
router.post('/autoaddusermonthloan', salaryController.UserMonthLoan);
// show data from UserMonrhLoan table
router.get('/showusermonthloan', salaryController.UserMonthLoanShow);
//auto add data to Deduction table
router.post('/autoadddeduction', salaryController.Deduction);
//show data from Deduction table
router.get('/showdeduction', salaryController.DeductionShow);
//auto add data to MonthEpfEtf  table
router.post('/autoaddmonthepfetf', salaryController.MonthEpfEtf);
//show data from MonthEpfEtf table
router.get('/showmonthepfetf', salaryController.MonthEpfEtfShow);
//save to FoodAllowance table
router.post('/addfoodallowance', salaryController.FoodAllowanSave);
//show to FoodAllowance table
router.get('/showfoodallowance', salaryController.FoodAllowanceShow);
//FoodAllowanceShowId
router.get('/showfoodallowance/:tableId', salaryController.FoodAllowanceShowId);
//update to FoodAllowance table
router.put('/updatefoodallowance/:tableId', salaryController.FoodAllowanceUpdate);
//delete to FoodAllowance table
router.delete('/deletefoodallowance/:tableId', salaryController.FoodAllowanceDelete);
//auto add to MonthFoodAllowance table
router.post('/autoaddmonthfoodallowance', salaryController.MonthFoodAllowance);
//show to MonthFoodAllowance table
router.get('/showmonthfoodallowance', salaryController.MonthFoodAllowanceShow);
//add to RoleOTIncome table
router.post('/addroleotincome', salaryController.RoleOTIncomeSave);
//show to RoleOTIncome table
router.get('/showroleotincome', salaryController.RoleOTIncomeShow);
//RoleOTIncomeShowById
router.get('/showroleotincome/:tableId', salaryController.RoleOTIncomeShowById);
//update to RoleOTIncome table
router.put('/updateroleotincome/:tableId', salaryController.RoleOTIncomeUpdate);
//delete to RoleOTIncome table
router.delete('/deleteroleotincome/:tableId', salaryController.RoleOTIncomeDelete);
//auto add to MonthOT table
router.post('/autoaddmonthot', salaryController.MonthOT);
//show to MonthOT table
router.get('/showmonthot', salaryController.MonthOTShow);
//add to Additions table
router.post('/addadditions', salaryController.Additions);
//show to Additions table
router.get('/showadditions', salaryController.AdditionsShow);
//add to UserNetPay table
router.post('/addusernetpay', salaryController.UserNetPay);
//show to UserNetPay table
router.get('/showusernetpay', salaryController.UserNetPayShow);
//add to MonthSalarySheet table
router.post('/addmonthsalarysheet', salaryController.MonthSalarySheet);
//show to MonthSalarySheet table
router.get('/showmonthsalarysheet', salaryController.MonthSalarySheetShow);
//Show to id MonthSalarySheetIdShowID
router.get('/showmonthsalarysheet/:tableId', salaryController.MonthSalarySheetIdShowID);
// add to SubTotalMonthSalarySheet table
router.post('/addsubtotalmonthsalarysheet', salaryController.SubTotalMonthSalarySheet);
// show to SubTotalMonthSalarySheet table
router.get('/showsubtotalmonthsalarysheet', salaryController.SubTotalMonthSalarySheetShow);
//Add to AllMonthSalarySheet table
router.post('/addallmonthsalarysheet', salaryController.AllMonthSalarySheet);
//show to AllMonthSalarySheet table
router.get('/showallmonthsalarysheet', salaryController.AllMonthSalarySheetShow);
//Show table id to AllMonthSalarySheet table
router.get('/showallmonthsalarysheet/:tableId', salaryController.AllMonthSalarySheetIdShow);
//show showAllrole
router.get('/showallrole', salaryController.showAllrole); 


// //Add to BioData table
// router.post('/addbiodata', salaryController.BioDataSave);
// //Show to BioData table
// router.get('/showbiodata', salaryController.BioDataShow);

// //Show to BioData table by id
router.get('/showbiodata/:tableId', salaryController.BioDataShowId);
//BioDataShowUserId
router.get('/showuseridbiodata/:userId', salaryController.BioDataShowUserId);
// //Update to BioData table
// router.put('/updatebiodata/:tableId', salaryController.BioDataUpdate);
// //Delete to BioData table
// router.delete('/deletebiodata/:tableId', salaryController.BioDataDelete);






module.exports = router;
