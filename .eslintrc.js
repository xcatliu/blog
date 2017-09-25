module.exports = {
  extends: [
    'eslint-config-alloy',
  ],
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // @fixable 一个缩进必须用两个空格替代
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    'no-var': 'off',
    'max-nested-callbacks': 'off'
  }
};