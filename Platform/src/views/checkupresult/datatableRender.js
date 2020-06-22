/**
 * 生成数据表格
 * @param {*} data 数据信息
 * @param data {
 *  @param { JSON<Array<Array<fieldoption>>>} fields 表格显示字段配置
 *  @param { JSON } fieldoption 对应字段配置
 *  @param fieldoption {
 *    @param { String } Title 对应列明
 *    @param { String } Field 单元格对应字段
 *    @param { String } Style 单元格样式
 *    @param { Function } Template 当Field是 Template 返回当前行数据
 *  } 
 *  @param { JSON } data 表格数据 
 * }
 * 生成表配置信息
 * @param { JSON } options 
 * @param options {
 *  @param { String } tableClass  表Class
 *  @param { String } tableSytle  表Style
 *  @param { String } tableId 表Id
 * }
 */
function dataTable(data, options) {
    // 记录包含字段的列
    var tableFields = [];

    // 添加表头数据
    function setThead(fields) {
        var header = []
        header.push('<thead>');
        for (var k in fields) {
            var hrow = fields[k]
            header.push('<tr>');
            for (var key in hrow) {
                if (hrow[key].Field || hrow[key].Template) {
                    tableFields.push(hrow[key])
                }
                header.push('<th style="text-align: center;" ')
                if (hrow[key].Width){
                    header.push('width="' + hrow[key].Width + '" ');
                }
                if (hrow[key].Colspan) {
                    header.push('colspan="' + hrow[key].Colspan + '" ');
                }
                if (hrow[key].Rowspan) {
                    header.push('rowspan=' + hrow[key].Rowspan + '" ');
                }
                header.push('>' + hrow[key].Title + '</th>')
            }
            header.push('</tr>');
        }
        header.push('</thead>');
        return header.join('');
    }

    // 添加表数据
    function setTbody(fields, data) {
        var bodyer = [];
        bodyer.push('<tbody>');
        for (var k in data) {
            var row = data[k];
            bodyer.push('<tr>')
            for (var i in fields) {
                bodyer.push('<td ')
                if (fields[i].Style) {
                    bodyer.push('style="' + fields[i].Style + '"');
                }
                bodyer.push(' >')
                if (fields[i].Field) {
                    var de = row[fields[i].Field]
                    if (row[fields[i].Field] && row[fields[i].Field] != '0') {
                        bodyer.push(row[fields[i].Field]);
                    }
                } else {
                    bodyer.push(fields[i].Template(row, k));
                }
                bodyer.push('</td>')
            }
            bodyer.push('</tr>')
        }
        bodyer.push('</tbody>');
        return bodyer.join('');
    }

    var table = []
    table.push('<table ');
    // 添加表对应Class
    if (options.tableClass) {
        table.push('class="' + options.tableClass + '" ')
    }
    // 添加表对应Style
    if (options.tableSytle) {
        table.push('style="' + options.tableSytle + '" ')
    }
    // 添加表对应ID
    if (options.tableId) {
        table.push('id="' + options.tableId + '" ')
    }

    table.push('>');
    table.push(setThead(data.fields));
    table.push(setTbody(tableFields, data.data));
    table.push('</table>');
    return table.join('')
}