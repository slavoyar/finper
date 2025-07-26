import 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    ATable: (typeof import('ant-design-vue'))['Table'];
    AButton: (typeof import('ant-design-vue'))['Button'];
    AFloatButton: (typeof import('ant-design-vue'))['FloatButton'];
    AInput: (typeof import('ant-design-vue'))['Input'];
    AInputNumber: (typeof import('ant-design-vue'))['InputNumber'];
    AModal: (typeof import('ant-design-vue'))['Modal'];
    AForm: (typeof import('ant-design-vue'))['Form'];
    AFormItem: (typeof import('ant-design-vue'))['FormItem'];
    ASelect: (typeof import('ant-design-vue'))['Select'];
    AOption: (typeof import('ant-design-vue'))['SelectOption'];
    ACheckbox: (typeof import('ant-design-vue'))['Checkbox'];
    ACheckboxGroup: (typeof import('ant-design-vue'))['CheckboxGroup'];
    ARadio: (typeof import('ant-design-vue'))['Radio'];
    ARadioGroup: (typeof import('ant-design-vue'))['RadioGroup'];
    ASpin: (typeof import('ant-design-vue'))['Spin'];
    ATooltip: (typeof import('ant-design-vue'))['Tooltip'];
    AList: (typeof import('ant-design-vue'))['List'];
    AListItem: (typeof import('ant-design-vue'))['ListItem'];
    ACard: (typeof import('ant-design-vue'))['Card'];
    ATypography: (typeof import('ant-design-vue'))['Typography'];
    ATypographyTitle: (typeof import('ant-design-vue'))['TypographyTitle'];
    ATypographyParagraph: (typeof import('ant-design-vue'))['TypographyParagraph'];
    ATypographyText: (typeof import('ant-design-vue'))['TypographyText'];
    ATypographyLink: (typeof import('ant-design-vue'))['TypographyLink'];
    ALayout: (typeof import('ant-design-vue'))['Layout'];
    ALayoutHeader: (typeof import('ant-design-vue'))['LayoutHeader'];
    ALayoutContent: (typeof import('ant-design-vue'))['LayoutContent'];
    ALayoutFooter: (typeof import('ant-design-vue'))['LayoutFooter'];
    ALayoutSider: (typeof import('ant-design-vue'))['LayoutSider'];
    AMenu: (typeof import('ant-design-vue'))['Menu'];
    AMenuItem: (typeof import('ant-design-vue'))['MenuItem'];
    AFlex: (typeof import('ant-design-vue'))['Flex'];
    ASpace: (typeof import('ant-design-vue'))['Space'];
    AResult: (typeof import('ant-design-vue'))['Result'];
    AQrcode: (typeof import('ant-design-vue'))['Qrcode'];
    // Add more components here as needed
  }
}
