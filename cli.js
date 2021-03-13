#!/usr/bin/env node

// Node cli应用入口文件必须要有以上的文件头
// 如果是Linux或者是MacOs还需要修改此文件的读写权限为755
// 具体修改方式：chmod 755 cli.js


// 脚手架工作过程：
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件

const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const ejs = require('ejs')
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name'
    },
    {
        type: 'input',
        name: 'version',
        message: 'Project Version'
    }
]).then((answers) => {
    // 模版目录
    const temPath = path.join(__dirname, 'templates')
    // 目标目录 (一般为当前项目的工作目录)
    const destPath = process.cwd()
    // 将模版下的文件全部输出到目标目录
    fs.readdir(temPath, (err, files) => {
        if (err) throw err
        files.forEach(file => {
            // 通过模版引擎渲染文件
            ejs.renderFile(path.join(temPath, file), answers, (err, result) => {
                if (err) throw err
                // 将目标文件写入到目标路径
                fs.writeFileSync(path.join(destPath, file), result)
            })
        })
    })
})