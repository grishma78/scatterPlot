var deptid=0;

var arrange = function (dep_ID, jsonEmp, jsonDept, jsonPos, jsonPosDept, jsonPosDeptSal, jsonEmpDeptPos, app,response) {
    var data = [
        {
            values: []
        },
        {
            dept:[]
        }
    ];
     deptid=dep_ID;
     console.log("--Id"+dep_ID);
   

console.log(dep_ID);


        var obj = null;


        var flag = false;
        var deptid;
        var depPosId;
        var DeptPosSal;
        var empId;
        var EmpName;
        var EmpHeight;

       
        var k;
        for(var dp=0;dp<jsonPosDept.length;dp++)                       //check all pos for this dept
        {
           

            if (deptid == jsonPosDept[dp].dept_id) {
                depPosId = jsonPosDept[dp].dept_pos_id;
          
          
            flag = false;

          
            for (var dps = 0; dps < jsonPosDeptSal.length; dps++)         //get salary for that position
            {
                if (depPosId == jsonPosDeptSal[dps].dept_pos_id) {
                    

                    flag = true;
                    DeptPosSal = jsonPosDeptSal[dps].salary;

                    break;                                            //break after sal is stored
                } else{
                    flag = false;
                }


            }
            
            if (flag = true) {                                          //check only if sal is present for that pos

              for(var edp=0;edp<jsonEmpDeptPos.length;edp++)                      //check if emp is present for that dept pos
                {

                    if (depPosId == jsonEmpDeptPos[edp].dp_id) {

                        empId = jsonEmpDeptPos[edp].e_id;               //get emp id for that dept pos
                   // console.log(empId);
                    






                    for (var e = 0; e < jsonEmp.length; e++)           //get height from empid in emp
                    { obj = {};

                        if (empId == jsonEmp[e].id) {

                            EmpName = jsonEmp[e].name;
                            console.log( jsonEmp[e].id);
                            EmpHeight = jsonEmp[e].height;
                            obj["s"]=DeptPosSal;
                            obj["h"] = jsonEmp[e].height;
                           obj["eid"]=jsonEmp[e].id;
                          
                           if(obj)
                           data[0].values.push(obj);
                            break;

                        }

                    }


          
                }
                
                }
                
            
            }
            

           

           
        }
       
         
          ;
          
        }
        data[1].dept=jsonDept;
       
       return data;
    
};


exports.arrange = arrange;
