const express = require('express');
const router = express.Router();

const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("admin", "admin"));
const session = driver.session();


router.get('/', (req, res, next) => {


    // res.status(200)({

    session
        .run('MATCH (n:Product_Type) RETURN n')
        .then(function (result) {
            var data = [];
            result.records.forEach(function(record){
                data.push({
                    com_id: record._fields[0].identity.low,
                    type_name: record._fields[0].properties.type_name
                });
            });

            /*res.render('company', {
                companies: data
            });*/

            

        })

        /*
        com_id: '公司ID',
        com_name: result.records,
        com_sec_name: '公司简称',
        com_registered_name: '公司注册名称',
        com_logo: '公司LOGO',
        com_des: '公司描述信息',
        com_cont_addr: '公司详细地址'*/

        //product_type: result.records
    //});



    .catch(function (error) {
        console.log(error);
    });

});

module.exports = router;