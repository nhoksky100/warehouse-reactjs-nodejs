var express = require('express');
var body = require('body-parser');
var bcrypt = require('bcryptjs');
const path = require('path');
var fs = require('fs/promises');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var router = express.Router();var express = require('express');
var body = require('body-parser');
var bcrypt = require('bcryptjs');
const path = require('path');
var fs = require('fs/promises');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
var mysql = require('mysql');
// const { get } = require('https');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_quanlykho'
});
conn.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log("Connected!");
});
// mysql 
// select 
router.get('/getWarehouse', function (req, res, next) {

    conn.query('SELECT * FROM warehouse', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getCreateWarehouse', function (req, res, next) {

    conn.query('SELECT * FROM createwarehouse', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getIntoWarehouse', function (req, res, next) {

    conn.query('SELECT * FROM into_warehouse', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getSupplier', function (req, res, next) {

    conn.query('SELECT * FROM supplier', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getDocument', function (req, res, next) {

    conn.query('SELECT * FROM document', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequest', function (req, res, next) {

    conn.query('SELECT * FROM request_list', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});


router.get('/getMember', function (req, res, next) {

    conn.query('SELECT * FROM member', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getItemsList', function (req, res, next) {

    conn.query('SELECT * FROM items', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getAccount', function (req, res, next) {

    conn.query('SELECT * FROM account', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getApproveOrder', function (req, res, next) {

    conn.query('SELECT * FROM order_approver', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequestTeamp', function (req, res, next) {

    conn.query('SELECT * FROM order_save', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequestTransferSaveTeamp', function (req, res, next) {

    conn.query('SELECT * FROM order_save_transfer_export', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequestTransfer', function (req, res, next) {

    conn.query('SELECT * FROM request_transfer_export', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequestHistory', function (req, res, next) {

    conn.query('SELECT * FROM request_history', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getRequestTransferHistory', function (req, res, next) {

    conn.query('SELECT * FROM request_transfer_history', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getTransferExportApprover', function (req, res, next) {

    conn.query('SELECT * FROM transfer_export_approver', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});
router.get('/getNotification', function (req, res, next) {

    conn.query('SELECT * FROM notification', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response)
        }
    })
    //list product data
});


//add request order
router.post('/addOrderRequest', function (req, res, next) {
    // Lấy dữ liệu từ req.body

    // dateCreated,
    // dateUpdate
    var {
        id,
        warehouseAreaName,
        orderCode,
        orderMaker,
        orderName,
        orderNotes,
        unit,
        amount,
        unitPrice,
        intoMoney,
        department,
        statusOrder,
        // idSave,
        permission,
        dateCreated,
        dateUpdate
    } = req.body;
    const orderApprove = 'PUR,DA,CA,CEO';
    let orderPointApprove = '0,0,0,0'
    let orderComplete = 0
    if (permission === 'Lãnh đạo') {
        orderPointApprove = '0,0,0,1'
        statusOrder = 'Đã duyệt'
        orderComplete = 1
    } else if (permission === 'Thành viên thu mua') {
        orderPointApprove = '1,0,0,0'
    } else if (permission === 'Trưởng phòng' && department !== 'Kế toán') {
        orderPointApprove = '0,1,0,0'
    } else if (permission === 'Trưởng phòng' && department === 'Kế toán') {
        orderPointApprove = '0,0,1,0'
    }
    // else if (permission === 'Trưởng phòng kế toán') {
    //     orderPointApprove = '0,0,1,0'
    // }
    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO request_list (id,warehouseAreaName,orderCode, orderMaker,orderApprove,orderPointApprove, orderName,orderNotes, unitPrice, amount, intoMoney, unit, statusOrder, department, dateCreated, dateUpdate,orderComplete) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [id, warehouseAreaName, orderCode, orderMaker, orderApprove, orderPointApprove, orderName, orderNotes, unitPrice, amount, intoMoney, unit, statusOrder, department, dateCreated, dateUpdate, orderComplete];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm yêu cầu:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm yêu cầu' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'Yêu cầu đã được thêm thành công' });
        }
    });
});
//add member
router.post('/addMember', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        memberCode,
        memberMaker,
        memberPermission,
        memberName,
        memberDepartment,
        memberGender,
        memberAddress,
        memberNumberPhone,
        memberEmail,
        memberStatus,
        memberDateCreated,
        memberDateUpdate
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO member (id,memberCode, memberMaker, memberPermission, memberName, memberDepartment, memberGender, memberAddress, memberNumberPhone, memberEmail,memberStatus, memberDateCreated, memberDateUpdate) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
    const values = [id, memberCode, memberMaker, memberPermission, memberName, memberDepartment, memberGender, memberAddress, memberNumberPhone, memberEmail, memberStatus, memberDateCreated, memberDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm thành viên:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm thành viên' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'Thành viên đã được thêm thành công' });
        }
    });
});
//add account
router.post('/addAccount', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        accountCode,
        accountUserName,
        accountPassword,
        accountEmail,
        accountPermission,
        accountDateCreated,
        accountDateUpdate
    } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(accountPassword, salt);
    accountPassword = hash;
    const accountStatus = 'Đang sử dụng'
    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO account (id,accountCode, accountUserName, accountPassword, accountEmail, accountPermission,accountStatus, accountDateCreated, accountDateUpdate) VALUES (?,?, ?, ?, ?, ?, ?, ?,?)";
    const values = [id, accountCode, accountUserName, accountPassword, accountEmail, accountPermission, accountStatus, accountDateCreated, accountDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm tài khoản:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm tài khoản' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'Tài khoản đã được thêm thành công' });
        }
    });
});
// add item
router.post('/addItems', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        itemsCode,
        itemsName,
        itemsMaker,
        itemsWarehouseAreaName,
        itemsCommodities,
        itemsResidualMin,
        itemsResidualMax,
        itemsUnit,
        itemsUnitPrice,
        itemsDateCreated,
        itemsDateUpdate
    } = req.body;
    const itemsStatus = 'Đang sử dụng'
    const itemsResidual = 0

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO items (id,itemsCode, itemsName,itemsMaker, itemsWarehouseAreaName, itemsCommodities,itemsResidual, itemsResidualMin, itemsResidualMax, itemsUnit, itemsUnitPrice,itemsStatus, itemsDateCreated,itemsDateUpdate) VALUES (?,?,?, ?,?, ?,?, ?, ?, ?, ?, ?,?, ?)";
    const values = [id, itemsCode, itemsName, itemsMaker, itemsWarehouseAreaName, itemsCommodities, itemsResidual, itemsResidualMin, itemsResidualMax, itemsUnit, itemsUnitPrice, itemsStatus, itemsDateCreated, itemsDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm thành viên:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm thành viên' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'Thành viên đã được thêm thành công' });
        }
    });
});
// add supplier
router.post('/addSupplier', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,

        supplierName,
        supplierNumberPhone,
        supplierEmail,
        supplierAddress,
        supplierCompany,
        supplierStatus,
        supplierDateCreated,
        supplierDateUpdate,
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO supplier (id, supplierName, supplierNumberPhone, supplierEmail, supplierAddress, supplierCompany, supplierStatus, supplierDateCreated,supplierDateUpdate) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [id, supplierName, supplierNumberPhone, supplierEmail, supplierAddress, supplierCompany, supplierStatus, supplierDateCreated, supplierDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// add notification
router.post('/addNotification', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        idRequest,
        idMember,
        title,
        content,
        maker,
        department,
        status,
        isApproved,
        pointApprovedInto,
        pointApprovedExport,
        tab,
        isRead,
        dateCreated,
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO notification (id, idRequest, idMember, title, content, maker, department, status,isApproved,tab,pointApprovedInto,pointApprovedExport,isRead,dateCreated) VALUES (?,?,?, ?,?, ?, ?, ?, ?, ?,?,?,?, ?)";
    const values = [id, idRequest, idMember, title, content, maker, department, status, isApproved, tab, pointApprovedInto, pointApprovedExport, isRead, dateCreated];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// add approveDate
router.post('/addApproveDate', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        orderApprove,
        orderCode,
        department,
        dateUpdate,
        idRequest
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO order_approver (id,orderApprove, department, dateUpdate, orderCode,idRequest) VALUES (?,?, ?, ?, ?,?)";
    const values = [id, orderApprove, department, dateUpdate, orderCode, idRequest];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// add CreateWarehouse area
router.post('/addCreateWarehouse', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    var {
        id,
        warehouseCode,
        warehouseName,
        warehouseStatus,
        warehouseDateCreated,
        warehouseDateUpdate
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO createwarehouse (id,warehouseCode, warehouseName, warehouseStatus, warehouseDateCreated,warehouseDateUpdate) VALUES (?,?, ?, ?, ?,?)";
    const values = [id, warehouseCode, warehouseName, warehouseStatus, warehouseDateCreated, warehouseDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// add intoWarehouse 
router.post('/addIntoWarehouse', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    const {
        id,
        orderCode,
        orderName,
        orderNotes,
        unit,
        amount,
        unitPrice,
        intoMoney,
        documentCode,
        orderSupplierName,
        intoWarehouseItemsCommodities,
        intoWarehouseDateUpdate,
        idIntoWarehouse,
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO into_warehouse (id,intoWarehouseCodeDocument, intoWarehouseItemsCode, intoWarehouseItemsName, intoWarehouseItemsCommodities,intoWarehouseUnitPrice,intoWarehouseAmountReceived,intoMoney,intoWarehouseUnit,intoWarehouseSupplier,intoWarehouseNotes,intoWarehouseDateUpdate,idRequest) VALUES (?,?, ?, ?, ?,?,?,?,?,?,?,?,?)";

    const values = [idIntoWarehouse, documentCode, orderCode, orderName,
        intoWarehouseItemsCommodities, unitPrice, amount, intoMoney, unit, orderSupplierName, orderNotes, intoWarehouseDateUpdate, id
    ];
    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            const sqlUpdate = "UPDATE request_list SET orderComplete = ? WHERE id = ?";
            conn.query(sqlUpdate, [3, id], function (errUpdate, resultUpdate) {
                if (errUpdate) {
                    console.log(errUpdate)
                }
            });

            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }

    });


});
router.post('/addWarehouse', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    const {
        id,
        idWarehouse,
        itemsCode,
        itemsName,
        itemsWarehouseAreaName,
        itemsCommodities,
        itemsResidualMin,
        itemsResidualMax,
        itemsUnit,
        itemsUnitPrice,
        itemsDateCreated,

    } = req.body;
    const warehouseResidual = 0
    const warehouseExpectedOut = 0
    const warehouseStatus = 'Hàng mới'
    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO warehouse (id,warehouseCode,warehouseItemsCode, warehouseItemsName,warehouseAreaName, warehouseItemsCommodities, warehouseUnitPrice,warehouseResidual,warehouseUnit,warehouseExpectedOut,warehouseQuotaMin,warehouseQuotaMax,warehouseStatus,warehouseDateCreated) VALUES (?,?, ?,?,?, ?, ?,?,?,?,?,?,?,?)";

    const values = [id, idWarehouse, itemsCode, itemsName, itemsWarehouseAreaName,
        itemsCommodities, itemsUnitPrice, warehouseResidual, itemsUnit, warehouseExpectedOut, itemsResidualMin,
        itemsResidualMax, warehouseStatus, itemsDateCreated, id
    ];
    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {

            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }

    });


});
// thêm chứng từ
router.post('/addDocument', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    const {
        id,
        documentCode,
        documentImage,
        documentDateCreated,

    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO document (id,documentCode, documentImage, documentDateCreated) VALUES (?,?, ?, ?)";
    const values = [id, documentCode, documentImage, documentDateCreated]

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// thêm ngày duyệt xuất đơn
router.post('/addApproveDateTransferExport', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    const {
        id,
        requestTransferMaker,
        requestTransferDepartment,
        requestDateUpdate,
        warehouseItemsCode,
        idRequest,
    } = req.body;

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO transfer_export_approver (id,requestTransferMaker, requestTransferDepartment, requestDateUpdate,warehouseItemsCode,idRequest) VALUES (?,?, ?, ?,?,?)";
    const values = [id, requestTransferMaker, requestTransferDepartment, requestDateUpdate, warehouseItemsCode, idRequest]

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// thêm yêu câu xuất 
router.post('/addTransferExportRequest', function (req, res, next) {
    // Lấy dữ liệu từ req.body
    const {
        id, // Sử dụng rowAddIndex trực tiếp
        warehouseCode,
        warehouseItemsCode,
        requestTransferFromWarehouse,
        requestTransferToWarehouse,
        requestTransferMaker,
        requestTransferItemsName,
        requestTransferNotes,
        requestTransferUnit,
        requestTransferWarehouseResidual,
        requestTransferAmount,
        requestTransferAmountApproved,
        requestTransferUnitPrice,
        requestTransferIntoMoney,
        requestTransferStatus, // Khai báo trực tiếp
        requestTransferDepartment,
        // idSave: isSave ? id : '',
        permission,
        requestDateCreated, // Sử dụng ngày tạo từ dataRequest nếu tồn tại, ngược lại sử dụng ngày tạo mới
        requestDateUpdate // Khai báo trực tiếp
    } = req.body;
    const requestTransferApprove = 'DA,CA'
    const requestTransferPointApprove = '0,0'
    const requestTransferComplete = 0
    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO request_transfer_export (id,warehouseCode, warehouseItemsCode, requestTransferFromWarehouse,requestTransferToWarehouse,requestTransferMaker,requestTransferApprove,requestTransferPointApprove,requestTransferDepartment,requestTransferNotes,requestTransferItemsName,requestTransferUnit,requestTransferAmount,requestTransferAmountApproved,requestTransferUnitPrice,requestTransferWarehouseResidual,requestTransferIntoMoney,requestTransferStatus,requestDateCreated,requestDateUpdate,requestTransferComplete) VALUES (?,?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [id, warehouseCode, warehouseItemsCode, requestTransferFromWarehouse, requestTransferToWarehouse, requestTransferMaker,
        requestTransferApprove, requestTransferPointApprove, requestTransferDepartment, requestTransferNotes, requestTransferItemsName, requestTransferUnit, requestTransferAmount,
        requestTransferAmountApproved, requestTransferUnitPrice, requestTransferWarehouseResidual, requestTransferIntoMoney, requestTransferStatus, requestDateCreated, requestDateUpdate, requestTransferComplete
    ]

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm thành công' });
        }
    });
});
// add order request teamp
router.post('/addOrderRequestTeamp', function (req, res, next) {
    // Lấy dữ liệu từ req.body

    var {
        id,
        saveCode,
        warehouseAreaName,
        savePermission,
        saveUserName,
        idSave,
        orderCode,
        orderMaker,
        statusOrder,
        orderName,
        orderNotes,
        unit,
        amount,
        unitPrice,
        intoMoney,
        department,
        dateCreated,
        dateUpdate,
    } = req.body;
    const orderApprove = 'PUR,DA,CA,CEO';
    const orderPointApprove = '0,0,0,0'

    // Thực hiện truy vấn SQL bằng prepared statement
    const sql = "INSERT INTO order_save (id,saveCode,warehouseAreaName, savePermission, saveUserName, idSave,orderCode,orderMaker,orderApprove,orderPointApprove,orderName,orderNotes,unitPrice,amount,intoMoney,unit,statusOrder,department,dateCreated,dateUpdate) VALUES (?,?,?, ?,?,?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [id, saveCode, warehouseAreaName, savePermission, saveUserName, idSave, orderCode, orderMaker, orderApprove, orderPointApprove, orderName, orderNotes, unitPrice, amount, intoMoney,
        unit, statusOrder, department, dateCreated, dateUpdate
    ];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm tạm lưu đơn ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm tạm lưu đơn thành công' });
        }
    });
});

// update save add-requestTransfer export teamp
router.post('/addTransferExportRequestTemp', function (req, res, next) {
    const {
        id: id, // Sử dụng rowAddIndex trực tiếp
        warehouseCode,
        warehouseItemsCode,
        requestTransferUserName,
        requestTransferFromWarehouse,
        requestTransferToWarehouse,
        requestTransferMaker,
        requestTransferItemsName,
        requestTransferNotes,
        requestTransferUnit,
        requestTransferWarehouseResidual,
        requestTransferAmount,
        requestTransferAmountApproved,
        requestTransferUnitPrice,
        requestTransferIntoMoney,
        requestTransferStatus, // Khai báo trực tiếp
        requestTransferDepartment,

        requestTranferPermission,
        requestDateCreated, // Sử dụng ngày tạo từ dataRequest nếu tồn tại, ngược lại sử dụng ngày tạo mới
        requestDateUpdate, // Khai báo trực tiếp
    } = req.body;

    // console.log(statusOrder);
    // console.log(id);
    const sql = "INSERT INTO order_save_transfer_export  (id,warehouseCode,warehouseItemsCode,requestTransferUserName, requestTransferFromWarehouse, requestTransferToWarehouse, requestTransferMaker, requestTransferItemsName, requestTransferNotes, requestTransferUnit, requestTransferWarehouseResidual, requestTransferAmount, requestTransferAmountApproved,requestTransferUnitPrice, requestTransferIntoMoney, requestTransferStatus, requestTransferDepartment, requestTranferPermission, requestDateCreated, requestDateUpdate) VALUES (?,?,?, ?,?,?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [id, warehouseCode, warehouseItemsCode, requestTransferUserName, requestTransferFromWarehouse, requestTransferToWarehouse, requestTransferMaker, requestTransferItemsName, requestTransferNotes, requestTransferUnit, requestTransferWarehouseResidual,
        requestTransferAmount, requestTransferAmountApproved, requestTransferUnitPrice, requestTransferIntoMoney, requestTransferStatus, requestTransferDepartment, requestTranferPermission, requestDateCreated, requestDateUpdate];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm tạm lưu đơn ' });
        } else {
            // console.log("Yêu cầu đã được thêm thành công:", result);
            return res.json({ status: true, message: 'thêm tạm lưu đơn thành công' });
        }
    });
})



// update member
router.post('/updateDataMember', function (req, res, next) {
    const { pushDataNewMember } = req.body;

    const dataList = {
        id,
        memberCode,
        memberMaker,
        memberPermission,
        memberName,
        memberDepartment,
        memberGender,
        memberAddress,
        memberNumberPhone,
        memberEmail,
        memberStatus,
        memberDateCreated,
        memberDateUpdate
    } = pushDataNewMember[0];

    var sql = "UPDATE member SET memberCode=?, memberMaker=?, memberPermission=?, memberName=?, memberDepartment=?,memberGender=?, memberAddress=?, memberNumberPhone=?, memberEmail=?,memberStatus=?, memberDateCreated=?, memberDateUpdate=? WHERE id=?";
    conn.query(sql, [dataList.memberCode, dataList.memberMaker, dataList.memberPermission, dataList.memberName, dataList.memberDepartment, dataList.memberGender, dataList.memberAddress,
    dataList.memberNumberPhone, dataList.memberEmail, dataList.memberStatus, dataList.memberDateCreated, dataList.memberDateUpdate, dataList.id
    ], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update account
router.post('/updatedataSupplier', function (req, res, next) {

    const { pushDataNewSuplier } = req.body;
    // console.log(pushDataNewAccount[0].id);

    // console.log(pushDataNewAccount);
    const dataList = {
        id,
        supplierName,
        supplierNumberPhone,
        supplierEmail,
        supplierAddress,
        supplierCompany,
        supplierDateUpdate,
        supplierStatus,

    } = pushDataNewSuplier[0];
    var sql = "UPDATE supplier SET supplierName=? ,supplierNumberPhone=?  ,supplierEmail=? ,supplierAddress=? ,supplierCompany=? ,supplierDateUpdate=? ,supplierStatus=? WHERE id=?";
    conn.query(sql, [dataList.supplierName, dataList.supplierNumberPhone, dataList.supplierEmail, dataList.supplierAddress,
    dataList.supplierCompany, dataList.supplierDateUpdate, dataList.supplierStatus, dataList.id
    ], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})

// update updateNotification
router.post('/updateNotification', function (req, res, next) {

    const { id, isRead } = req.body;
    // console.log(pushDataNewAccount[0].id);

    // console.log(pushDataNewAccount);
    var sql = "UPDATE notification SET isRead=? WHERE id=?";
    conn.query(sql, [isRead, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
router.post('/updateNotificationPointInto', function (req, res, next) {

    const { idRequest, status, pointApprovedInto, isRead, dateCreated } = req.body;
    // console.log(pushDataNewAccount[0].id);

    // console.log(pushDataNewAccount);
    var sql = "UPDATE notification SET status=?, pointApprovedInto=?,isRead=?, dateCreated=? WHERE idRequest=?";
    conn.query(sql, [status, pointApprovedInto, isRead, dateCreated, idRequest], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update account
router.post('/upateAccount', function (req, res, next) {

    const { accountCode, accountStatus, accountDateUpdate } = req.body;
    // console.log(pushDataNewAccount[0].id);

    // console.log(pushDataNewAccount);
    var sql = "UPDATE account SET accountStatus=? ,accountDateUpdate=? WHERE accountCode=?";
    conn.query(sql, [accountStatus, accountDateUpdate, accountCode], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update approved export purchase
router.post('/updatePurchaseExport', function (req, res, next) {
    const { dataRequestExportPDF } = req.body;

    // Lặp qua mỗi mục trong dataRequestExportPDF
    const updatePromises = dataRequestExportPDF.map(item => {
        return new Promise((resolve, reject) => {
            const sqlUpdate = "UPDATE order_approver SET datePrint = ? WHERE idRequest = ?";
            conn.query(sqlUpdate, [item.dateUpdate, item.id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });

});
// update approved export transfer
router.post('/updateRequestTransferExport', function (req, res, next) {
    let { dataRequestExportPDF } = req.body;

    const updatePromises = dataRequestExportPDF.map(item => {
        return new Promise((resolve, reject) => {
            let sqlUpdate, params;
            let requestTransferPending = item.requestTransferPending === null && 0

            // Kiểm tra giá trị isIdHistoryUpdated
            if (parseInt(requestTransferPending) === 1) {
                if (parseInt(item.requestTransferTotalAmountExport) >= parseInt(item.requestTransferAmountApproved)) {
                    requestTransferPending = 0;
                }
                // Nếu isIdHistoryUpdated là true, không cập nhật idHistory
                sqlUpdate = "UPDATE request_transfer_export SET requestTransferTotalAmountExport = ?, requestTransferAmountExport = ?, requestTransferWarehouseResidual = ?, requestTransferIntoMoney = ?, requestDateUpdate = ?, requestDateVouchers = ?, requestTransferPending = ? WHERE id = ?";
                params = [item.requestTransferTotalAmountExport, item.requestTransferAmountExport, item.requestTransferWarehouseResidual, item.requestTransferIntoMoney, item.requestDateUpdate, item.requestDateVouchers, requestTransferPending, item.id];
            } else {
                // Nếu isIdHistoryUpdated là false, cập nhật tất cả các trường bao gồm idHistory
                if (parseInt(item.requestTransferTotalAmountExport) < parseInt(item.requestTransferAmountApproved)) {
                    requestTransferPending = 1;
                }
                sqlUpdate = "UPDATE request_transfer_export SET requestTransferTotalAmountExport = ?, requestTransferAmountExport = ?, requestTransferWarehouseResidual = ? , requestTransferIntoMoney = ?, requestDateUpdate = ?, requestDateVouchers = ?, requestIdHistory = ?, requestTransferPending = ? WHERE id = ?";
                params = [item.requestTransferTotalAmountExport, item.requestTransferAmountExport, item.requestTransferWarehouseResidual, item.requestTransferIntoMoney, item.requestDateUpdate, item.requestDateVouchers, item.idHistory, requestTransferPending, item.id];

            }

            conn.query(sqlUpdate, params, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });
});


// update approved transfer amount export
router.post('/updateRequestTransferExportApprove', function (req, res, next) {
    const { dataRequestExportPDF } = req.body;

    // Lặp qua mỗi mục trong dataRequestExportPDF
    const updatePromises = dataRequestExportPDF.map(item => {
        // Kiểm tra cập nhật cho mỗi mục trong order_approver dựa trên id
        return new Promise((resolve, reject) => {
            const sqlUpdate = "UPDATE transfer_export_approver SET datePrint = ? WHERE idRequest = ?";
            conn.query(sqlUpdate, [item.requestDateUpdate, item.id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });
});

// update approved export transfer warehouse
router.post('/updateWarehouseResidual', function (req, res, next) {
    const { dataRequestExportPDF } = req.body;

    // Lặp qua mỗi mục trong dataRequestExportPDF
    const updatePromises = dataRequestExportPDF.map(item => {
        // Kiểm tra cập nhật cho mỗi mục trong order_approver dựa trên id
        return new Promise((resolve, reject) => {
            const sqlUpdate = "UPDATE warehouse SET warehouseResidual = ?, warehouseDateUpdate = ?, exportWarehouseDate = ? WHERE warehouseItemsCode = ?";
            conn.query(sqlUpdate, [item.requestTransferWarehouseResidual, item.requestDateUpdate, item.requestDateUpdate, item.warehouseItemsCode], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });
});



// into approved export transfer history
router.post('/intoRequestTransferExportHistory', function (req, res, next) {
    const { idHistory, caseRequest, idRequestTransfers, dateCreated } = req.body;

    const sql = "INSERT INTO request_transfer_history (idHistory, idRequestTransfers,caseRequest, dateCreated) VALUES (?,?, ?, ?)";
    const values = [idHistory, idRequestTransfers, caseRequest, dateCreated];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            return res.json({ status: true, message: 'Thêm thành công' });
        }
    });
});


router.post('/updatedataListAccount', function (req, res, next) {

    const { pushDataNewAccount } = req.body;
    // console.log(pushDataNewAccount[0].id);
    let dataList = {
        id,
        accountCode,
        accountUserName,
        accountPassword,
        accountEmail,
        accountPermission,

        accountDateCreated,
        accountDateUpdate
    } = pushDataNewAccount[0];
    // console.log(pushDataNewAccount);
    var sql = "UPDATE account SET  accountUserName=?, accountPassword=?, accountEmail=?, accountPermission=?, accountDateCreated=?, accountDateUpdate=? WHERE accountCode=?";
    conn.query(sql, [dataList.accountUserName, dataList.accountPassword, dataList.accountEmail, dataList.accountPermission, dataList.accountDateCreated, dataList.accountDateUpdate, dataList.accountCode], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
//  update unitPrice request not approve
router.post('/updatedataRequestList', function (req, res, next) {

    const { pushDataRequest } = req.body;
    // console.log(pushDataNewAccount[0].id);
    let dataList = {
        id,
        unitPrice,
        intoMoney,
        dateUpdate,

    } = pushDataRequest[0];
    // console.log(pushDataNewAccount);
    var sql = "UPDATE request_list SET  unitPrice=?,intoMoney=?, dateUpdate=? WHERE id=?";
    conn.query(sql, [dataList.unitPrice, intoMoney, dataList.dateUpdate, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
router.post('/updatedataItemsList', function (req, res, next) {

    const { pushDataNewItemsList } = req.body;

    let dataList = {
        id,
        itemsName,
        itemsCommodities,
        itemsResidualMin,
        itemsResidualMax,
        itemsUnit,
        itemsUnitPrice,
        itemsStatus,
        itemsDateUpdate
    } = pushDataNewItemsList[0];

    var sql = "UPDATE items SET  itemsName=?, itemsCommodities=?, itemsResidualMin=?,itemsResidualMax=?,itemsUnit=?,itemsUnitPrice=?,itemsStatus=?, itemsDateUpdate=? WHERE id=?";
    conn.query(sql, [dataList.itemsName, dataList.itemsCommodities, dataList.itemsResidualMin, dataList.itemsResidualMax, dataList.itemsUnit, dataList.itemsUnitPrice,
    dataList.itemsStatus, dataList.itemsDateUpdate, dataList.id
    ], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update request approve
router.post('/updateAppremovedRequest', function (req, res, next) {
    const { id, statusOrder, orderSupplierName = '', orderPointApprove, dateUpdate, reasonMessage, orderComplete } = req.body;
    // console.log(statusOrder);
    // console.log(id);
    const sql = "UPDATE request_list SET orderSupplierName=?, orderPointApprove=?, statusOrder=?, orderReason=? ,dateUpdate=?, orderComplete=? WHERE id=?";
    conn.query(sql, [orderSupplierName, orderPointApprove, statusOrder, reasonMessage, dateUpdate, orderComplete, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update complete approved
router.post('/updateAppremovedRequestComplete', function (req, res, next) {
    const { idHistory, orderComplete, dataRequestExportPDF } = req.body;

    const updatePromises = dataRequestExportPDF.map(item => {
        return new Promise((resolve, reject) => {
            const sqlUpdate = "UPDATE request_list SET idHistory=?,dateUpdate=?, orderComplete = ? WHERE id = ?";
            conn.query(sqlUpdate, [idHistory, item.dateUpdate, orderComplete, item.id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });
});

// into history request
router.post('/intoRequestHistory', function (req, res, next) {
    const { idHistory, idRequests, dateCreated } = req.body;

    const sql = "INSERT INTO request_history (idHistory, idRequests, dateCreated) VALUES (?, ?, ?)";
    const values = [idHistory, idRequests, dateCreated];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm:", err);
            return res.status(500).json({ status: false, message: 'Có lỗi xảy ra khi thêm ' });
        } else {
            return res.json({ status: true, message: 'Thêm thành công' });
        }
    });
});

// update complete approved warehouse
router.post('/updateAppremovedTransferComplete', function (req, res, next) {

    const { requestTransferComplete, dataRequestExportPDF } = req.body;

    // Lặp qua mỗi mục trong dataRequestExportPDF
    const updatePromises = dataRequestExportPDF.map(item => {
        // Kiểm tra cập nhật cho mỗi mục trong order_approver dựa trên id
        return new Promise((resolve, reject) => {
            const sqlUpdate = "UPDATE request_transfer_export SET requestTransferComplete = ? WHERE id = ?";
            conn.query(sqlUpdate, [requestTransferComplete, item.id], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    Promise.all(updatePromises)
        .then(results => {
            res.status(200).json({ message: 'All updates successful', results });
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred during updates', details: error });
        });

})
// update remove order teamp request approve
router.post('/removeOrderTeamp', function (req, res, next) {
    var { id } = req.body;

    conn.query('DELETE FROM order_save WHERE id=  "' + id + '" ', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response);
        }
    })
})
// update remove order teamp request approve
router.post('/removeTransferExportRequestTeamp', function (req, res, next) {
    var { id } = req.body;

    conn.query('DELETE FROM order_save_transfer_export WHERE id=  "' + id + '" ', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response);
        }
    })
})

// update save teamp
router.post('/updateOrderRequestTeamp', function (req, res, next) {
    const {
        id,
        saveCode,
        warehouseAreaName,
        savePermission,
        saveUserName,
        idSave,
        orderCode,
        orderNotes,
        orderMaker,
        statusOrder,
        orderName,
        unit,
        amount,
        unitPrice,
        intoMoney,
        department,
        dateCreated,
        dateUpdate,
    } = req.body;
    const orderApprove = 'PUR,DA,CA,CEO';
    const orderPointApprove = '0,0,0,0'
    // console.log(statusOrder);
    // console.log(id);
    const sql = "UPDATE order_save SET saveCode=?,warehouseAreaName=?, savePermission=?, saveUserName=?, idSave=?, orderCode=?, orderMaker=?, orderApprove=?, orderPointApprove=?, orderName=?, orderNotes=?, unitPrice=?, amount=?, intoMoney=?, unit=?, statusOrder=?, department=?, dateCreated=?, dateUpdate=? WHERE id=?";
    conn.query(sql, [saveCode, warehouseAreaName, savePermission, saveUserName, idSave, orderCode, orderMaker, orderApprove, orderPointApprove, orderName, orderNotes, unitPrice, amount, intoMoney, unit, statusOrder, department, dateCreated, dateUpdate, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
// update save add-requestTransfer export teamp
router.post('/updateTransferExportRequestTemp', function (req, res, next) {
    const {
        id: id, // Sử dụng rowAddIndex trực tiếp
        warehouseCode,
        warehouseItemsCode,
        requestTransferUserName,
        requestTransferFromWarehouse,
        requestTransferToWarehouse,
        requestTransferMaker,
        requestTransferItemsName,
        requestTransferNotes,
        requestTransferUnit,
        requestTransferWarehouseResidual,
        requestTransferAmount,
        requestTransferAmountApproved,
        requestTransferUnitPrice,
        requestTransferIntoMoney,
        requestTransferStatus, // Khai báo trực tiếp
        requestTransferDepartment,

        requestTranferPermission,
        requestDateCreated, // Sử dụng ngày tạo từ dataRequest nếu tồn tại, ngược lại sử dụng ngày tạo mới
        requestDateUpdate, // Khai báo trực tiếp
    } = req.body;
    const orderApprove = 'PUR,DA,CA,CEO';
    const orderPointApprove = '0,0,0,0'
    // console.log(statusOrder);
    // console.log(id);
    const sql = "UPDATE order_save_transfer_export SET warehouseCode=?,warehouseItemsCode=?,requestTransferUserName = ?, requestTransferFromWarehouse=?, requestTransferToWarehouse=?, requestTransferMaker=?, requestTransferItemsName=?, requestTransferNotes=?, requestTransferUnit=?, requestTransferWarehouseResidual=?, requestTransferAmount=?, requestTransferAmountApproved=?, requestTransferUnitPrice=?, requestTransferIntoMoney=?, requestTransferStatus=?, requestTransferDepartment=?, requestTranferPermission=?, requestDateCreated=?, requestDateUpdate=? WHERE id=?";
    conn.query(sql, [warehouseCode, warehouseItemsCode, requestTransferUserName, requestTransferFromWarehouse, requestTransferToWarehouse, requestTransferMaker, requestTransferItemsName, requestTransferNotes, requestTransferUnit, requestTransferWarehouseResidual, requestTransferAmount, requestTransferAmountApproved, requestTransferUnitPrice, requestTransferIntoMoney, requestTransferStatus, requestTransferDepartment, requestTranferPermission, requestDateCreated, requestDateUpdate, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})
router.post('/updatedataWarehouseList', function (req, res, next) {
    const {
        pushdataWarehouse
    } = req.body;
    dataList = {
        warehouseExpectedOut,
        warehouseQuotaMin,
        warehouseQuotaMax,
        warehouseDateUpdate,
        id
    } = pushdataWarehouse[0]


    const sql = "UPDATE warehouse SET warehouseExpectedOut=?,warehouseQuotaMin=?, warehouseQuotaMax=?,warehouseDateUpdate=?  WHERE id=?";
    conn.query(sql, [dataList.warehouseExpectedOut, dataList.warehouseQuotaMin, dataList.warehouseQuotaMax, dataList.warehouseDateUpdate, dataList.id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


})

router.post('/updateWarehouseInto', function (req, res, next) {
    const {
        warehouseType,
        warehouseItemsCode,
        warehouseItemsName,
        warehouseAreaName,
        warehouseItemsCommodities,
        warehouseUnitPrice,
        warehouseResidual,
        warehouseUnit,
        intoWarehouseCode,
        intoWarehouseDate,
    } = req.body;


    const sql = "UPDATE warehouse SET warehouseType=?,warehouseItemsName=?,warehouseAreaName=? ,warehouseItemsCommodities=? ,warehouseUnitPrice=? ,warehouseResidual=? ,warehouseUnit=? ,intoWarehouseCode=?,intoWarehouseDate=? WHERE warehouseItemsCode=?";
    conn.query(sql, [warehouseType, warehouseItemsName, warehouseAreaName, warehouseItemsCommodities,
        warehouseUnitPrice, warehouseResidual, warehouseUnit, intoWarehouseCode, intoWarehouseDate, warehouseItemsCode
    ], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


})
router.post('/updatedataWarehouseListStatus', function (req, res, next) {
    const {
        id,
        warehouseDateUpdate,
        warehouseStatus
    } = req.body;

    if (warehouseStatus !== 'Đang sử dụng') {
        warehouseStatus = 'Không dùng'
    }

    const sql = "UPDATE warehouse SET warehouseStatus=?,warehouseDateUpdate=? WHERE id=?";
    conn.query(sql, [warehouseStatus, warehouseDateUpdate, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


})
router.post('/updateAppremovedRequestTransferExport', function (req, res, next) {
    const {
        id,
        requestTransferPointApprove,
        requestTransferStatus,
        requestDateUpdate,
        requestTransferReason,
        requestTransferComplete,
    } = req.body;



    const sql = "UPDATE request_transfer_export SET requestTransferPointApprove=?, requestTransferStatus=? , requestDateUpdate=?, requestTransferReason=?, requestTransferComplete=?  WHERE id=?";
    conn.query(sql, [requestTransferPointApprove, requestTransferStatus, requestDateUpdate, requestTransferReason, requestTransferComplete, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


})
router.post('/updateChangePassword', function (req, res, next) {
    let {
        id,
        accountEmail,
        accountPassword,
        accountDateUpdate
    } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(accountPassword, salt);
    accountPassword = hash;

    const sql = "UPDATE account SET accountPassword=?,accountEmail=?, accountDateUpdate=? WHERE id=?";
    conn.query(sql, [accountPassword, accountEmail, accountDateUpdate, id], function (err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })


})

router.post('/login_Account', async function (req, res) {
    try {
        // Đọc dữ liệu từ file JSON


        // Xử lý dữ liệu và thêm một bản ghi mới
        const { dataLogin, username, password, } = req.body;

        bcrypt.compare(password, dataLogin.accountPassword, function (err, resIsLogin) {

            // res === true
            if (resIsLogin && (dataLogin.accountUserName === username || username === dataLogin.accountEmail)) {
                const hashPermission = bcrypt.hashSync(dataLogin.accountPermission, 10);
                // Mã hóa data
                const dataToEncode = {
                    id: dataLogin.id,
                    accountCode: dataLogin.accountCode,
                    accountUserName: dataLogin.accountUserName,
                    accountPermission: hashPermission,
                    accountEmail: dataLogin.accountEmail,
                };
                const tokenData = jwt.sign(dataToEncode, 'data1991');

                return res.send({
                    id: dataLogin.id,
                    // status: true,
                    message: 'Đăng nhập thành công',
                    // token: tokenId,
                    isLogin: true,
                    tokenData,
                    hashPermission: hashPermission
                })


            } else {
                return res.send({

                    // status: false,
                    message: 'Đăng nhập không thành công',
                    token: '',
                    isLogin: false
                })
            }

        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/decodeData', async function (req, res) {
    try {
        // Đọc dữ liệu từ file JSON
        // Xử lý dữ liệu và thêm một bản ghi mới
        const { encode } = req.body;

        if (encode) {
            const decodedData = jwt.verify(encode, 'data1991');
            return res.send({
                // status: true,
                message: 'Mã hóa thất thành công',
                // token: tokenId,
                isDeCode: true,
                decodedData,

            })

        } else {
            return res.send({
                // status: false,
                message: 'Mã hóa thất bại',
                decodedData: [],
                isDeCode: false
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


const upload_file = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/Upload_File.json');
router.post('/uploadFile', async function (req, res) {
    try {
        // Đọc dữ liệu từ file JSON
        let data = [];
        try {
            const jsonData = await fs.readFile(upload_file, 'utf8');
            data = JSON.parse(jsonData);
        } catch (error) {
            // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
            data = [];
        }

        // Xử lý dữ liệu và thêm một bản ghi mới
        const { id, nameSong, nameSinger, categoryMusic, describe, imageProfile, audioFileName, audioFileSize, dateTime, } = req.body;

        const dataSignUpList = {
            id: id,
            nameSong: nameSong,
            nameSinger: nameSinger,
            categoryMusic: categoryMusic,
            describe: describe,
            imageProfile: imageProfile,
            audioFileName: audioFileName,
            audioFileSize: audioFileSize,
            dateTime: dateTime
        };
        data.push(dataSignUpList);

        // Ghi dữ liệu mới vào file JSON
        await fs.writeFile(upload_file, JSON.stringify(data, null, 5), 'utf8');

        // Phản hồi với dữ liệu mới
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

const audioUploader = multer({ dest: '../public/fileMp3' });
// const fileMp3Dir = path.join(__dirname, 'public', 'fileMp3');

// async function createDirectory(dir) {
//     try {
//         fs.accessSync(fileMp3Dir);
//         console.log(`Thư mục ${fileMp3Dir} đã tồn tại.`);
//     } catch (err) {
//         // Nếu không tồn tại, tạo thư mục
//         fs.mkdir(fileMp3Dir, { recursive: true });
//         console.log(`Thư mục ${fileMp3Dir} đã được tạo.`);
//     }
// }
// createDirectory(fileMp3Dir);
router.post('/uploadFileMp3', audioUploader.single('audio'), async (req, res) => {
    try {
        const processedFile = req.file || {};

        let orgName = processedFile.originalname || '';
        orgName = orgName.trim().replace(/ /g, "-");
        const fullPathInServ = processedFile.path;

        // Đổi tên của file vừa upload lên
        const newFullPath = `${fullPathInServ}-${orgName}.mp3`;

        // Sử dụng fs.promises.rename thay vì fs.renameSync
        await fs.rename(fullPathInServ, newFullPath);

        res.send({
            status: true,
            message: 'file uploaded',
            fileNameInServer: newFullPath,
        });
    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(500).send('Internal Server Error');
    }
});
let dataCityJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/data.json');
router.get('/dataCity', async function (req, res) {
    try {
        const data = await fs.readFile(dataCityJson.data, 'utf8');
        console.log(data);
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// accountCustomer

let accCustomer = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/Account_Customer.json');
router.get('/account_Customer', async function (req, res) {
    try {
        const data = await fs.readFile(accCustomer, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/signUp_Account', async function (req, res) {
    try {
        // Đọc dữ liệu từ file JSON
        let data = [];
        try {
            const jsonData = await fs.readFile(accCustomer, 'utf8');
            data = JSON.parse(jsonData);
        } catch (error) {
            // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
            data = [];
        }
        // Xử lý dữ liệu và thêm một bản ghi mới
        let {
            id,
            userName = '',
            password,
            email,
            name = '',
            image = '',
            dateTimeCreate = "",
            dateTimeEdit = "",
            domain = '',

        } = req.body;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        password = hash;

        // Kiểm tra xem id đã tồn tại trong dữ liệu hay chưa
        let idExists = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].email === email) {
                // Cập nhật mật khẩu nếu id đã tồn tại
                data[i].password = password;
                data[i].dateTimeEdit = dateTimeEdit;
                idExists = true;
                break;
            }
        }

        if (!idExists) {
            // Nếu id chưa tồn tại, thêm mới bản ghi
            const dataSignUpList = {
                id: id,
                userName: userName,
                password: password,
                email: email,
                name: name,
                image: image,
                phone: "",
                numberAccBank: "",
                numberCardBank: "",
                nameBank: "",
                nameAccBank: "",
                dateReleaseCardBank: "",
                branchBank: "",
                addressCityBank: "",
                dateTimeCreate: dateTimeCreate,
                dateTimeEdit: dateTimeEdit,
                domain: domain
            };
            data.push(dataSignUpList);
        }
        // Ghi dữ liệu mới vào file JSON
        await fs.writeFile(accCustomer, JSON.stringify(data, null, 5), 'utf8');

        // Phản hồi với dữ liệu mới
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/updateAccount', async function (req, res) {
    const dataProfile = req.body.dataProfile; // Nhận dữ liệu từ request body

    let data = [];
    try {
        const jsonData = await fs.readFile(accCustomer, 'utf8');
        data = JSON.parse(jsonData);
    } catch (error) {
        // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
        data = [];
    }

    // Cập nhật dữ liệu trong data (hoặc cơ sở dữ liệu) dựa trên dữ liệu nhận được từ client
    // Ví dụ: data.push(dataProfile); hoặc thực hiện các thao tác cập nhật vào cơ sở dữ liệu
    // Tìm kiếm trong mảng dữ liệu có id trùng khớp với dataProfile.id
    const index = data.findIndex(item => item.id === dataProfile.id);
    if (index !== -1) {
        // Nếu tìm thấy id trùng khớp, cập nhật dữ liệu của mục đó với dataProfile
        data[index] = dataProfile;
    }
    //  else {
    //     // Nếu không tìm thấy id trùng khớp, thêm dataProfile vào mảng
    //     data.push(dataProfile);
    // }
    // Ghi dữ liệu mới vào file JSON (nếu cần)
    await fs.writeFile(accCustomer, JSON.stringify(data, null, 5), 'utf8');

    // Phản hồi với dữ liệu mới
    res.json(data[index]);
});

let fileImage = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/ImageProfile.json');
router.get('/imageFile', async function (req, res) {
    let data = []
    try {
        data = await fs.readFile(fileImage, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        data = []
        // console.error(err);
        // res.status(500).send('Internal Server Error');
    }
});
router.post('/imageFile', async function (req, res) {
    // const dataProfile = req.body.dataProfile; // Nhận dữ liệu từ request body

    let data = [];
    try {
        const jsonData = await fs.readFile(fileImage, 'utf8');
        data = JSON.parse(jsonData);
    } catch (error) {
        // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
        data = [];
    }


    // const index = data.findIndex(item => item.id === dataProfile.id);
    let idExists = false;
    const { id, email, image = '' } = req.body;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            // Cập nhật mật khẩu nếu id đã tồn tại
            data[i].image = image;

            idExists = true;
            break;
        }
    }
    if (!idExists) {
        const dataList = {
            id: id,
            email: email,
            image: image
        }
        data.push(dataList);
    }


    // Ghi dữ liệu mới vào file JSON (nếu cần)
    await fs.writeFile(fileImage, JSON.stringify(data, null, 5), 'utf8');

    // Phản hồi với dữ liệu mới
    res.json(data);
});
let listSendFiendJSON = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/ListSendFriend.json');
router.get('/listSendFriend', async function (req, res) {
    let data = []
    try {
        data = await fs.readFile(listSendFiendJSON, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        data = []
        // console.error(err);
        // res.status(500).send('Internal Server Error');
    }
});
router.post('/listSendFriend', async function (req, res) {

    let data = [];
    try {
        const jsonData = await fs.readFile(listSendFiendJSON, 'utf8');
        data = JSON.parse(jsonData);
    } catch (error) {
        // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
        data = [];
    }
    let { dataFriend, statusSendFriend = '', dataFriendSender } = req.body;
    let idExists = false;
    // const index = data.findIndex(item => item.id === dataProfile.id);
    for (let i = 0; i < data.length; i++) {
        if (data[i].email === dataFriend.email) {
            // Cập nhật mật khẩu nếu id đã tồn tại
            data[i].statusSendFriend = statusSendFriend;

            idExists = true;
            break;
        }
    }
    if (!idExists) {
        const dataList = {
            id: dataFriend.id,
            idSender: dataFriendSender.id,
            email: dataFriend.email,
            emailSender: dataFriendSender.email,
            name: dataFriend.name,
            nameSender: dataFriendSender.name,
            userName: dataFriend.userName,
            userNameSender: dataFriendSender.userName,
            image: dataFriend.image,
            imageSender: dataFriendSender.image,
            statusSendFriend: statusSendFriend,
        }
        data.push(dataList);
    }



    // Ghi dữ liệu mới vào file JSON (nếu cần)
    await fs.writeFile(listSendFiendJSON, JSON.stringify(data, null, 5), 'utf8');

    // Phản hồi với dữ liệu mới
    res.json(data);
});

// // send email confirm
// let confirmEmail = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/ConfirmEmail.json');
// router.get('/sendEmailConfirm', async function(req, res) {
//     try {
//         const data = await fs.readFile(confirmEmail, 'utf8');
//         res.json(JSON.parse(data));
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.post('/sendEmailConfirm', async function(req, res) {
//     try {
//         // Đọc dữ liệu từ file JSON
//         let data = [];
//         try {
//             const jsonData = await fs.readFile(confirmEmail, 'utf8');
//             data = JSON.parse(jsonData);
//         } catch (error) {
//             // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
//             data = [];
//         }

//         // Xử lý dữ liệu và thêm một bản ghi mới
//         let { dataAccountCustomer, randomNumber } = req.body;

//         // Kiểm tra xem email đã tồn tại trong data hay không
//         let emailExists = false;
//         for (let i = 0; i < data.length; i++) {
//             if (data[i].email === dataAccountCustomer.email || data[i].id === dataAccountCustomer.id) {
//                 // Nếu tồn tại, cập nhật randomNumber và đánh dấu email đã tồn tại
//                 const hashedRandomNumber = bcrypt.hashSync(randomNumber.join(""), 10);
//                 data[i].codeConfirm = hashedRandomNumber;
//                 emailExists = true;
//                 break;
//             }
//         }

//         // Nếu email không tồn tại, thêm một bản ghi mới
//         if (!emailExists) {
//             const hashedRandomNumber = bcrypt.hashSync(randomNumber.join(""), 10);
//             const dataList = {
//                 id: dataAccountCustomer.id,
//                 email: dataAccountCustomer.email,
//                 codeConfirm: hashedRandomNumber
//             };
//             data.push(dataList);
//         }

//         // Ghi dữ liệu mới vào file JSON
//         await fs.writeFile(confirmEmail, JSON.stringify(data, null, 5), 'utf8');

//         // Phản hồi với dữ liệu mới
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// let tokenProfilePath = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/tokenProfileCustomer.json');
// router.get('/tokenProfile', async function(req, res) {
//     try {
//         const data = await fs.readFile(tokenProfilePath, 'utf8');
//         res.json(JSON.parse(data));
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// router.post('/tokenProfile', async function(req, res) {
//     try {
//         // Kiểm tra xem file JSON có dữ liệu hay không
//         let data = [];
//         try {
//             const jsonData = await fs.readFile(tokenProfilePath, 'utf8');
//             data = JSON.parse(jsonData);
//         } catch (error) {
//             // Nếu file không tồn tại hoặc lỗi khi đọc, tạo một mảng mới
//             data = [];
//         }

//         // Xử lý dữ liệu và thêm một bản ghi mới
//         const { profileObj } = req.body;

//         // Thêm thông tin người dùng từ Facebook vào danh sách
//         data.push(profileObj);

//         // Ghi dữ liệu mới vào file JSON
//         await fs.writeFile(tokenProfilePath, JSON.stringify(data, null, 4), 'utf8');

//         // Phản hồi với dữ liệu mới
//         res.json(data);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./public/fileMp3/${fileName}`));
});

module.exports = router;

// Định nghĩa các đường dẫn đến các tệp JSON
const warehouseJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/warehouse.json');
const createWarehouseJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/createWarehouse.json');
const intoWarehouseJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/intoWarehouse.json');
const supplierJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/supplier.json');
const documentJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/document.json');
const requestListJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/requestList.json');
const requestTransferExport = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/requestTransferExport.json');
const memberJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/member.json');
const itemsJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/items.json');
const accountJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/account.json');
const orderApproverJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/orderApprover.json');
const orderSave = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/orderSave.json');
const orderSaveTransferExport = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/orderSaveTransferExport.json');
const transferExportApprover = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/transferExportApprover.json');
const notificationJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/notification.json');
const requestHistory = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/requestHistory.json');
const requestHistoryTransfer = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/requestHistoryTransfer.json');
const dataCityJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/data.json');
const accCustomerJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/Account_Customer.json');
const fileImageJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/ImageProfile.json');
const listSendFiendJSON = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/ListSendFriend.json');
const uploadFileJson = path.join(__dirname, '../../src/UrlRouter/ConnectJSON/Upload_File.json');

const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        return [];
    }
};

const writeJsonFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), 'utf8');
    } catch (err) {
        console.error(`Error writing file to disk: ${err}`);
    }
};

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

// Lấy dữ liệu
router.get('/getRequestTransfer', async (req, res) => {
    const data = await readJsonFile(requestTransferExport);
    res.json(data);
});
router.get('/getTransferExportApprover', async (req, res) => {
    const data = await readJsonFile(transferExportApprover);
    res.json(data);
});
router.get('/getRequestTeamp', async (req, res) => {
    const data = await readJsonFile(orderSave);
    res.json(data);
});
router.get('/getRequestTransferSaveTeamp', async (req, res) => {
    const data = await readJsonFile(orderSaveTransferExport);
    res.json(data);
});
router.get('/getRequestHistory', async (req, res) => {
    const data = await readJsonFile(requestHistory);
    res.json(data);
});
router.get('/getRequestTransferHistory', async (req, res) => {
    const data = await readJsonFile(requestHistoryTransfer);
    res.json(data);
});
router.get('/getWarehouse', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    res.json(data);
});

router.get('/getCreateWarehouse', async (req, res) => {
    const data = await readJsonFile(createWarehouseJson);
    res.json(data);
});

router.get('/getIntoWarehouse', async (req, res) => {
    const data = await readJsonFile(intoWarehouseJson);
    res.json(data);
});

router.get('/getSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    res.json(data);
});

router.get('/getDocument', async (req, res) => {
    const data = await readJsonFile(documentJson);
    res.json(data);
});

router.get('/getRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    res.json(data);
});

router.get('/getMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    res.json(data);
});

router.get('/getItemsList', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    res.json(data);
});

router.get('/getAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    res.json(data);
});

router.get('/getApproveOrder', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    res.json(data);
});

router.get('/getNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    res.json(data);
});

router.get('/dataCity', async (req, res) => {
    const data = await readJsonFile(dataCityJson);
    res.json(data);
});

router.get('/account_Customer', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    res.json(data);
});

router.get('/imageFile', async (req, res) => {
    const data = await readJsonFile(fileImageJson);
    res.json(data);
});

router.get('/listSendFriend', async (req, res) => {
    const data = await readJsonFile(listSendFiendJSON);
    res.json(data);
});

// Thêm dữ liệu
router.post('/addOrderRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newOrder = req.body;
    data.push(newOrder);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu đã được thêm thành công' });
});

router.post('/addMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    const newMember = req.body;
    data.push(newMember);
    await writeJsonFile(memberJson, data);
    res.json({ status: true, message: 'Thành viên đã được thêm thành công' });
});

router.post('/addAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    let newAccount = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newAccount.accountPassword, salt);
    newAccount.accountPassword = hash;
    data.push(newAccount);
    await writeJsonFile(accountJson, data);
    res.json({ status: true, message: 'Tài khoản đã được thêm thành công' });
});

router.post('/addItems', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    const newItem = req.body;
    data.push(newItem);
    await writeJsonFile(itemsJson, data);
    res.json({ status: true, message: 'Sản phẩm đã được thêm thành công' });
});

router.post('/addSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    const newSupplier = req.body;
    data.push(newSupplier);
    await writeJsonFile(supplierJson, data);
    res.json({ status: true, message: 'Nhà cung cấp đã được thêm thành công' });
});

router.post('/addNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const newNotification = req.body;
    data.push(newNotification);
    await writeJsonFile(notificationJson, data);
    res.json({ status: true, message: 'Thông báo đã được thêm thành công' });
});

router.post('/addApproveDate', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const newApproveDate = req.body;
    data.push(newApproveDate);
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Ngày duyệt đã được thêm thành công' });
});

router.post('/addCreateWarehouse', async (req, res) => {
    const data = await readJsonFile(createWarehouseJson);
    const newCreateWarehouse = req.body;
    data.push(newCreateWarehouse);
    await writeJsonFile(createWarehouseJson, data);
    res.json({ status: true, message: 'Kho mới đã được thêm thành công' });
});

router.post('/addIntoWarehouse', async (req, res) => {
    const data = await readJsonFile(intoWarehouseJson);
    const newIntoWarehouse = req.body;
    data.push(newIntoWarehouse);
    await writeJsonFile(intoWarehouseJson, data);
    res.json({ status: true, message: 'Hàng nhập kho đã được thêm thành công' });
});

router.post('/addWarehouse', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const newWarehouse = req.body;
    data.push(newWarehouse);
    await writeJsonFile(warehouseJson, data);
    res.json({ status: true, message: 'Kho đã được thêm thành công' });
});

router.post('/addDocument', async (req, res) => {
    const data = await readJsonFile(documentJson);
    const newDocument = req.body;
    data.push(newDocument);
    await writeJsonFile(documentJson, data);
    res.json({ status: true, message: 'Chứng từ đã được thêm thành công' });
});

router.post('/addApproveDateTransferExport', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const newApproveDateTransferExport = req.body;
    data.push(newApproveDateTransferExport);
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Ngày duyệt xuất đã được thêm thành công' });
});

router.post('/addTransferExportRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newTransferExportRequest = req.body;
    data.push(newTransferExportRequest);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu xuất kho đã được thêm thành công' });
});

router.post('/addOrderRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newOrderRequestTeamp = req.body;
    data.push(newOrderRequestTeamp);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu tạm thời đã được thêm thành công' });
});

router.post('/addTransferExportRequestTemp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const newTransferExportRequestTemp = req.body;
    data.push(newTransferExportRequestTemp);
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Yêu cầu xuất kho tạm thời đã được thêm thành công' });
});

// Cập nhật dữ liệu
router.post('/updateDataMember', async (req, res) => {
    const data = await readJsonFile(memberJson);
    const updatedMember = req.body.pushDataNewMember[0];
    const index = data.findIndex(member => member.id === updatedMember.id);
    if (index !== -1) {
        data[index] = updatedMember;
        await writeJsonFile(memberJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thành viên không tồn tại' });
    }
});

router.post('/updatedataSupplier', async (req, res) => {
    const data = await readJsonFile(supplierJson);
    const updatedSupplier = req.body.pushDataNewSuplier[0];
    const index = data.findIndex(supplier => supplier.id === updatedSupplier.id);
    if (index !== -1) {
        data[index] = updatedSupplier;
        await writeJsonFile(supplierJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Nhà cung cấp không tồn tại' });
    }
});

router.post('/updateNotification', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const { id, isRead } = req.body;
    const index = data.findIndex(notification => notification.id === id);
    if (index !== -1) {
        data[index].isRead = isRead;
        await writeJsonFile(notificationJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thông báo không tồn tại' });
    }
});

router.post('/updateNotificationPointInto', async (req, res) => {
    const data = await readJsonFile(notificationJson);
    const { idRequest, status, pointApprovedInto, isRead, dateCreated } = req.body;
    const index = data.findIndex(notification => notification.idRequest === idRequest);
    if (index !== -1) {
        data[index].status = status;
        data[index].pointApprovedInto = pointApprovedInto;
        data[index].isRead = isRead;
        data[index].dateCreated = dateCreated;
        await writeJsonFile(notificationJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Thông báo không tồn tại' });
    }
});

router.post('/upateAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    const { accountCode, accountStatus, accountDateUpdate } = req.body;
    const index = data.findIndex(account => account.accountCode === accountCode);
    if (index !== -1) {
        data[index].accountStatus = accountStatus;
        data[index].accountDateUpdate = accountDateUpdate;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/updatePurchaseExport', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(order => order.idRequest === item.id);
        if (index !== -1) {
            data[index].datePrint = item.dateUpdate;
        }
    });
    await writeJsonFile(orderApproverJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateRequestTransferExport', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].requestTransferTotalAmountExport = item.requestTransferTotalAmountExport;
            data[index].requestTransferAmountExport = item.requestTransferAmountExport;
            data[index].requestTransferWarehouseResidual = item.requestTransferWarehouseResidual;
            data[index].requestTransferIntoMoney = item.requestTransferIntoMoney;
            data[index].requestDateUpdate = item.requestDateUpdate;
            data[index].requestDateVouchers = item.requestDateVouchers;
            data[index].requestTransferPending = parseInt(item.requestTransferTotalAmountExport) < parseInt(item.requestTransferAmountApproved) ? 1 : 0;
            if (item.isIdHistoryUpdated) {
                data[index].requestIdHistory = item.idHistory;
            }
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateRequestTransferExportApprove', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(order => order.idRequest === item.id);
        if (index !== -1) {
            data[index].datePrint = item.requestDateUpdate;
        }
    });
    await writeJsonFile(orderApproverJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/updateWarehouseResidual', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(warehouse => warehouse.warehouseItemsCode === item.warehouseItemsCode);
        if (index !== -1) {
            data[index].warehouseResidual = item.requestTransferWarehouseResidual;
            data[index].warehouseDateUpdate = item.requestDateUpdate;
            data[index].exportWarehouseDate = item.requestDateUpdate;
        }
    });
    await writeJsonFile(warehouseJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/intoRequestTransferExportHistory', async (req, res) => {
    const data = await readJsonFile(orderApproverJson);
    const { idHistory, caseRequest, idRequestTransfers, dateCreated } = req.body;
    data.push({ idHistory, idRequestTransfers, caseRequest, dateCreated });
    await writeJsonFile(orderApproverJson, data);
    res.json({ status: true, message: 'Thêm thành công' });
});

router.post('/updatedataListAccount', async (req, res) => {
    const data = await readJsonFile(accountJson);
    const updatedAccount = req.body.pushDataNewAccount[0];
    const index = data.findIndex(account => account.accountCode === updatedAccount.accountCode);
    if (index !== -1) {
        data[index] = updatedAccount;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/updatedataRequestList', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedRequest = req.body.pushDataRequest[0];
    const index = data.findIndex(request => request.id === updatedRequest.id);
    if (index !== -1) {
        data[index].unitPrice = updatedRequest.unitPrice;
        data[index].intoMoney = updatedRequest.intoMoney;
        data[index].dateUpdate = updatedRequest.dateUpdate;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updatedataItemsList', async (req, res) => {
    const data = await readJsonFile(itemsJson);
    const updatedItem = req.body.pushDataNewItemsList[0];
    const index = data.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        data[index] = updatedItem;
        await writeJsonFile(itemsJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
});

router.post('/updateAppremovedRequest', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id, statusOrder, orderSupplierName, orderPointApprove, dateUpdate, reasonMessage, orderComplete } = req.body;
    const index = data.findIndex(request => request.id === id);
    if (index !== -1) {
        data[index].orderSupplierName = orderSupplierName;
        data[index].orderPointApprove = orderPointApprove;
        data[index].statusOrder = statusOrder;
        data[index].orderReason = reasonMessage;
        data[index].dateUpdate = dateUpdate;
        data[index].orderComplete = orderComplete;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateAppremovedRequestComplete', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { idHistory, orderComplete, dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].idHistory = idHistory;
            data[index].dateUpdate = item.dateUpdate;
            data[index].orderComplete = orderComplete;
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/intoRequestHistory', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { idHistory, idRequests, dateCreated } = req.body;
    data.push({ idHistory, idRequests, dateCreated });
    await writeJsonFile(requestListJson, data);
    res.json({ status: true, message: 'Thêm thành công' });
});

router.post('/updateAppremovedTransferComplete', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { requestTransferComplete, dataRequestExportPDF } = req.body;
    dataRequestExportPDF.forEach(item => {
        const index = data.findIndex(request => request.id === item.id);
        if (index !== -1) {
            data[index].requestTransferComplete = requestTransferComplete;
        }
    });
    await writeJsonFile(requestListJson, data);
    res.json({ message: 'All updates successful' });
});

router.post('/removeOrderTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id } = req.body;
    const index = data.findIndex(order => order.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        await writeJsonFile(requestListJson, data);
        res.json({ message: 'Xóa thành công' });
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/removeTransferExportRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id } = req.body;
    const index = data.findIndex(order => order.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        await writeJsonFile(requestListJson, data);
        res.json({ message: 'Xóa thành công' });
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateOrderRequestTeamp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedOrderRequestTeamp = req.body;
    const index = data.findIndex(order => order.id === updatedOrderRequestTeamp.id);
    if (index !== -1) {
        data[index] = updatedOrderRequestTeamp;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu tạm thời không tồn tại' });
    }
});

router.post('/updateTransferExportRequestTemp', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const updatedTransferExportRequestTemp = req.body;
    const index = data.findIndex(request => request.id === updatedTransferExportRequestTemp.id);
    if (index !== -1) {
        data[index] = updatedTransferExportRequestTemp;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu tạm thời không tồn tại' });
    }
});

router.post('/updatedataWarehouseList', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const updatedWarehouse = req.body.pushdataWarehouse[0];
    const index = data.findIndex(warehouse => warehouse.id === updatedWarehouse.id);
    if (index !== -1) {
        data[index].warehouseExpectedOut = updatedWarehouse.warehouseExpectedOut;
        data[index].warehouseQuotaMin = updatedWarehouse.warehouseQuotaMin;
        data[index].warehouseQuotaMax = updatedWarehouse.warehouseQuotaMax;
        data[index].warehouseDateUpdate = updatedWarehouse.warehouseDateUpdate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updateWarehouseInto', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { warehouseType, warehouseItemsCode, warehouseItemsName, warehouseAreaName, warehouseItemsCommodities, warehouseUnitPrice, warehouseResidual, warehouseUnit, intoWarehouseCode, intoWarehouseDate } = req.body;
    const index = data.findIndex(warehouse => warehouse.warehouseItemsCode === warehouseItemsCode);
    if (index !== -1) {
        data[index].warehouseType = warehouseType;
        data[index].warehouseItemsName = warehouseItemsName;
        data[index].warehouseAreaName = warehouseAreaName;
        data[index].warehouseItemsCommodities = warehouseItemsCommodities;
        data[index].warehouseUnitPrice = warehouseUnitPrice;
        data[index].warehouseResidual = warehouseResidual;
        data[index].warehouseUnit = warehouseUnit;
        data[index].intoWarehouseCode = intoWarehouseCode;
        data[index].intoWarehouseDate = intoWarehouseDate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updatedataWarehouseListStatus', async (req, res) => {
    const data = await readJsonFile(warehouseJson);
    const { id, warehouseDateUpdate, warehouseStatus } = req.body;
    const index = data.findIndex(warehouse => warehouse.id === id);
    if (index !== -1) {
        data[index].warehouseStatus = warehouseStatus === 'Đang sử dụng' ? 'Đang sử dụng' : 'Không dùng';
        data[index].warehouseDateUpdate = warehouseDateUpdate;
        await writeJsonFile(warehouseJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Kho không tồn tại' });
    }
});

router.post('/updateAppremovedRequestTransferExport', async (req, res) => {
    const data = await readJsonFile(requestListJson);
    const { id, requestTransferPointApprove, requestTransferStatus, requestDateUpdate, requestTransferReason, requestTransferComplete } = req.body;
    const index = data.findIndex(request => request.id === id);
    if (index !== -1) {
        data[index].requestTransferPointApprove = requestTransferPointApprove;
        data[index].requestTransferStatus = requestTransferStatus;
        data[index].requestDateUpdate = requestDateUpdate;
        data[index].requestTransferReason = requestTransferReason;
        data[index].requestTransferComplete = requestTransferComplete;
        await writeJsonFile(requestListJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Yêu cầu không tồn tại' });
    }
});

router.post('/updateChangePassword', async (req, res) => {
    const data = await readJsonFile(accountJson);
    let { id, accountEmail, accountPassword, accountDateUpdate } = req.body;
    const index = data.findIndex(account => account.id === id);
    if (index !== -1) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(accountPassword, salt);
        accountPassword = hash;
        data[index].accountPassword = accountPassword;
        data[index].accountEmail = accountEmail;
        data[index].accountDateUpdate = accountDateUpdate;
        await writeJsonFile(accountJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/login_Account', async (req, res) => {
    try {
        const dataLogin = req.body.dataLogin;
        const { username, password } = req.body;
        const data = await readJsonFile(accountJson);
        const user = data.find(account => account.accountUserName === username || account.accountEmail === username);
        if (user && bcrypt.compareSync(password, user.accountPassword)) {
            const hashPermission = bcrypt.hashSync(user.accountPermission, 10);
            const dataToEncode = {
                id: user.id,
                accountCode: user.accountCode,
                accountUserName: user.accountUserName,
                accountPermission: hashPermission,
                accountEmail: user.accountEmail,
            };
            const tokenData = jwt.sign(dataToEncode, 'data1991');
            res.json({
                id: user.id,
                message: 'Đăng nhập thành công',
                isLogin: true,
                tokenData,
                hashPermission,
            });
        } else {
            res.json({
                message: 'Đăng nhập không thành công',
                token: '',
                isLogin: false,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/decodeData', (req, res) => {
    const { encode } = req.body;
    if (encode) {
        try {
            const decodedData = jwt.verify(encode, 'data1991');
            res.json({
                message: 'Mã hóa thất thành công',
                isDeCode: true,
                decodedData,
            });
        } catch (err) {
            res.json({
                message: 'Mã hóa thất bại',
                decodedData: [],
                isDeCode: false,
            });
        }
    } else {
        res.json({
            message: 'Mã hóa thất bại',
            decodedData: [],
            isDeCode: false,
        });
    }
});



router.post('/signUp_Account', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    const newAccount = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(newAccount.password, salt);
    newAccount.password = hash;
    const index = data.findIndex(account => account.email === newAccount.email);
    if (index !== -1) {
        data[index].password = newAccount.password;
        data[index].dateTimeEdit = newAccount.dateTimeEdit;
    } else {
        data.push(newAccount);
    }
    await writeJsonFile(accCustomerJson, data);
    res.json(data);
});

router.post('/updateAccount', async (req, res) => {
    const data = await readJsonFile(accCustomerJson);
    const dataProfile = req.body.dataProfile;
    const index = data.findIndex(account => account.id === dataProfile.id);
    if (index !== -1) {
        data[index] = dataProfile;
        await writeJsonFile(accCustomerJson, data);
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }
});

router.post('/imageFile', async (req, res) => {
    const data = await readJsonFile(fileImageJson);
    const { id, email, image = '' } = req.body;
    const index = data.findIndex(profile => profile.id === id);
    if (index !== -1) {
        data[index].image = image;
    } else {
        data.push({ id, email, image });
    }
    await writeJsonFile(fileImageJson, data);
    res.json(data);
});



router.post('/uploadFile', async (req, res) => {
    const data = await readJsonFile(uploadFileJson);
    const newFile = req.body;
    data.push(newFile);
    await writeJsonFile(uploadFileJson, data);
    res.json(data);
});

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./public/fileMp3/${fileName}`));
});


module.exports = router;
