import 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    ATable: (typeof import('ant-design-vue'))['Table'];
    AButton: (typeof import('ant-design-vue'))['Button'];
    AInput: (typeof import('ant-design-vue'))['Input'];
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
    // Add more components here as needed
  }
}
