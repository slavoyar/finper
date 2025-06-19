<template>
  <AList v-bind="$attrs" :data-source="dataSource" :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3 }">
    <template #renderItem="{ item }">
      <AListItem :style="{ padding: 0 }">
        <ACard :title="item.name" style="width: 100%">
          <ATypography>
            <template v-for="(column, index) in columns" :key="column.key">
              <ATypographyParagraph
                v-if="
                  column.dataIndex !== 'name' &&
                  (item[column.dataIndex as keyof typeof item] || column.customRender)
                "
              >
                <ATypographyText strong> {{ column.title }}: </ATypographyText>
                <template v-if="column.customRender">
                  {{
                    column.customRender?.({
                      text: item[column.dataIndex as keyof typeof item],
                      value: Number(item[column.dataIndex as keyof typeof item]),
                      index,
                      record: item,
                    } as RenderParameters)
                  }}
                </template>
                <template v-else>
                  {{ item[column.dataIndex as keyof typeof item] }}
                </template>
              </ATypographyParagraph>
            </template>
          </ATypography>
        </ACard>
      </AListItem>
    </template>
  </AList>
</template>

<script setup lang="ts" generic="T">
import { TableColumnType } from 'ant-design-vue';
import { ColumnType } from 'ant-design-vue/es/table';

type DefaultCustomRender = NonNullable<ColumnType<T>['customRender']>;
type RenderParameters = Parameters<DefaultCustomRender>[0];

defineProps<{
  dataSource: T[];
  columns: TableColumnType<T>[];
}>();
</script>
