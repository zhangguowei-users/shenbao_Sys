// 基本信息表单内容
var baseTabForm = [{
        Name: '患者姓名：',
        InputId: 'Name'
    },
    {
        Name: '身份证号：',
        InputId: 'IdNumber'
    },
    {
        Name: '性别：',
        InputId: 'Gender'
    },
    {
        Name: '年龄：',
        InputId: 'Age'
    },
    {
        Name: '人员类型：',
        InputId: 'PersonalTypeName'
    },
    {
        Name: '民族：',
        InputId: 'FolkName'
    },
    {
        Name: '就诊编码',
        InputId: 'RegisterCode'
    },
    {
        Name: '就诊医院：',
        InputId: 'InstitutionName'
    },
    {
        Name: '医院等级：',
        InputId: 'InstitutiongGradeName'
    },
    {
        Name: '医院级别：',
        InputId: 'InstitutionLevelName'
    },
    {
        Name: '入院日期：',
        InputId: 'InHosDate'
    },
    {
        Name: '出院日期：',
        InputId: 'OutHosDate'
    },
    {
        Name: '住院天数：',
        InputId: 'InHosDay'
    },
//  {
//      Name: '登记日期：',
//      InputId: 'ClinicDate'
//  },
    {
        Name: '疾病名称：',
        InputId: 'DiseaseName'
    },
    {
        Name: '补偿年度：',
        InputId: 'CompYear'
    },
    {
        Name: '行政区划：',
        InputId: 'CityAreaName'
    },
]
// 费用信息表单内容
var infoTabForm = [{
        Name: '总费用：',
        InputId: 'ZFY'
    },
    {
        Name: '医保报销费：',
        InputId: 'YBBXFY'
    },
    {
        Name: '个人自付费：',
        InputId: 'GRZFFY'
    },
    {
        Name: '目录内费：',
        InputId: 'MLNFY'
    },
    {
        Name: '目录外费：',
        InputId: 'MLWFY'
    },
    {
        Name: '西药费：',
        InputId: 'XYF'
    },
    {
        Name: '中药费：',
        InputId: 'ZYF'
    },
    {
        Name: '草药费：',
        InputId: 'CYF'
    },
    {
        Name: '蒙药费：',
        InputId: 'MYF'
    },
    {
        Name: '检查费：',
        InputId: 'JCF'
    },
    {
        Name: '材料费：',
        InputId: 'CLF'
    },
    {
        Name: '特查费：',
        InputId: 'TCF'
    },
    {
        Name: '诊疗费费：',
        InputId: 'ZLF'
    },
    {
        Name: '化疗费：',
        InputId: 'HYF'
    },
    {
        Name: '手术费：',
        InputId: 'SSF'
    },
    {
        Name: '血液费：',
        InputId: 'XUEYF'
    },
    {
        Name: '特检费：',
        InputId: 'TJF'
    },
    {
        Name: '特治费：',
        InputId: 'TZF'
    },
    {
        Name: '其他费：',
        InputId: 'QTF'
    },
    {
        Name: '靶向药费：',
        InputId: 'BXYF'
    }
]

// 动态渲染表单内容
// ops 渲染字段及信息
// template 渲染模板方法
function FormRender(ops, template) {
    var dom = '';
    for (var k in ops) {
        var op = ops[k];
        dom += template(op)
    }

    return dom;
}

function Template(op) {
    var defaultOp = {
        Name: '',
        ID: '',
        Type: 'text',
        Verify: '',
        Placeholder: ''
    }

    for (var k in defaultOp) {
        if (!op[k]) {
            op[k] = defaultOp[k];
        }
    }

    return '<div class="layui-inline input-box layui-col-xs12 layui-col-sm6 layui-col-md4">\
        <label class="layui-form-label">' + op.Name + '</label>\
        <div class="layui-input-block">\
            <input type="' + op.Type + '" id="' + op.InputId + '" lay-verify="' + op.Verify + '"\
                autocomplete="off" placeholder="' + op.Placeholder + '" class="layui-input">\
        </div>\
    </div>'
}