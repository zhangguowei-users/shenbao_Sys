layui.define(['index','form','table','laydate'],function(exports){
    var $ = layui.$,
        admin = layui.admin,
        table = layui.table;

    function riseze(el, cb) {
        // 创建iframe标签，设置样式并插入到被监听元素中
        var iframe = document.createElement('iframe');
        iframe.setAttribute('class', 'size-watch');
        el.appendChild(iframe);

        // 记录元素当前宽高
        var oldWidth = el.offsetWidth;
        var oldHeight = el.offsetHeight;

        // iframe 大小变化时的回调函数
        function sizeChange() {
            // 记录元素变化后的宽高
            var width = el.offsetWidth;
            var height = el.offsetHeight;
            // 不一致时触发回调函数 cb，并更新元素当前宽高
            if (width !== oldWidth || height !== oldHeight) {
                cb({
                    width: width,
                    height: height
                }, {
                    width: oldWidth,
                    height: oldHeight
                });
                oldWidth = width;
                oldHeight = height;
            }
        }

        // 设置定时器用于节流
        var timer = 0;
        // 将 sizeChange 函数挂载到 iframe 的resize回调中
        iframe.contentWindow.onresize = function () {
            clearTimeout(timer);
            timer = setTimeout(sizeChange, 20);
        };
    }

    function setChartOption(data, title, color) {
        return {
            title: {
                text: title,
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },
            tooltip: {
                trigger: 'item',
            },
            series: [{
                type: 'pie',
                radius: '50%',
                center: ['50%', '50%'],
                data: data,
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: '#333'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
            }]
        };
    }

    // 批量表单项目赋值
    function SetFormValueByDataKey(data, ins) {
        for (var key in ins) {
            if (typeof data[ins[key]] != 'undefined') {
                $('#' + ins[key]).val(data[ins[key]]);
            } else {
                console.error(ins[key] + ' is not your data\'s key');
            }
        }
    }

    function GetResultInfo(CheckResultInfoCode) {
        admin.req({
            url: layui.setter.base_url + 'afterengine/SupervisionInfo/GetCheckResultInfoList',
            data: {
                key: CheckResultInfoCode
            },
            type: 'get',
            done: function (result) {
                $('#ms_name').html(result.data[0].Name);
                $('#ms_description').html(result.data[0].ResultDescription);
                $('#ms_checkdate').html(result.data[0].CheckDate);
            }
        });
    }

    function GetCFData(code,token) {
        table.render({
            elem: '#cfdetail',
            url: layui.setter.base_url + 'afterengine/CheckComplaint/GetCFDeatilListByCode',
            title: '处方明细表',
            totalRow: true,
            cols: [
                [{
                        field: 'ItemName',
                        title: '项目名称',
                        width: 180,
                        align: 'center',
                        totalRowText: '合计'
                    },
                    {
                        field: 'HisItemName',
                        title: 'His项目名称',
                        width: 180,
                        align: 'center',
                    },
                    {
                        field: 'CollectFeesCategoryName',
                        title: '收费类别',
                        width: 90,
                        align: 'center',
                    },
                    {
                        field: 'CollectFeesProjectGradeName',
                        title: '收费项目等级',
                        width: 120,
                        align: 'center',
                    },
                    {
                        field: 'PRICE',
                        title: '单价',
                        width: 80,
                        align: 'center',
                    },
                    {
                        field: 'COUNT',
                        title: '数量',
                        width: 80,
                        align: 'center',
                        totalRow: true
                    },
                    {
                        field: 'ZFY',
                        title: '总金额',
                        width: 100,
                        align: 'center',
                        totalRow: true
                    },
                    {
                        field: 'CompRatio',
                        title: '报销比例',
                        width: 100,
                        align: 'center'
                    },
                    {
                        field: 'YXJE',
                        title: '有效金额',
                        width: 100,
                        align: 'center',
                        totalRow: true
                    },
                    {
                        field: 'BKBXJE',
                        title: '不可报销金额',
                        width: 120,
                        align: 'center',
                        totalRow: true
                    }
                ]
            ],
            page: true,
            id: "Table",
            limit: 5, //每页显示5条
            limits: [5, 20, 45, 60, 75, 90],
            curr: 1,
            where: {
                token: token,
                registercode: code,
                flag: $('#flag').val()
            },
            headers: {
                Authorization: token
            },
            height: '350',
            done: function (res) {

            }
        });
    }

    function renderWGDesp(messages) {
        function template(message) {
            return '<div>\
                <blockquote class="layui-elem-quote" style="word-break:break-all;">' + message + '</blockquote>\
            </div>'
        }
        var dom = '';
        for (var i in messages) {
            var message = messages[i].ResultDescription;
            dom += template(message);
        }
        return dom;
    }

    function GetWGDesp(CheckResultInfoCode, baseUrl, rulescode) {
        var otherArr = layui.excodes;
        var reqUrl = '';
        if (otherArr.indexOf(rulescode) > -1) {
            reqUrl = 'afterengine/SupervisionInfo/GetCheckResultInfoList'
        } else {
            reqUrl = 'afterengine/SupervisionInfo/GetCheckResultPreInfoList';
        }

        admin.req({
            url: baseUrl + reqUrl,
            data: {
                key: CheckResultInfoCode
            },
            type: 'get',
            done: function (result) {
                if (result.code == 0) {
                    $('#wgms').html(renderWGDesp(result.data));
                }
            }
        })
    }

    function GetFeeDetail(registercode, personalcode,callback) {
        admin.req({
            url: layui.setter.base_url + 'afterengine/CheckComplaint/GetFeeDetail',
            data: {
                registerCode: registercode,
                personalCode: personalcode,
                flag: $('#flag').val()
            },
            type: 'get',
            done: callback
        });

    }


    exports('functions',{
        riseze:riseze,
        setChartOption:setChartOption,
        SetFormValueByDataKey:SetFormValueByDataKey,
        GetResultInfo:GetResultInfo,
        GetCFData:GetCFData,
        renderWGDesp:renderWGDesp,
        GetWGDesp:GetWGDesp,
        GetFeeDetail:GetFeeDetail
    })
})