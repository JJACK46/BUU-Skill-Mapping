a
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { ref } from 'vue';
import { read, utils, type WorkSheet, writeFile } from 'xlsx';

type DataSet = { [index: string]: WorkSheet };
type Row = unknown[];
type RowCB = (row: Row) => string;
type Column = { field: string; label: string; display: RowCB };
type RowCol = { rows: Row[]; cols: Column[] };

const currFileName = ref<string>('');
const currSheet = ref<string>('');
const sheets = ref<string[]>([]);
const workBook = ref<DataSet>({} as DataSet);
const rows = ref<Row[]>([]);
const columns = ref<Column[]>([]);
const loading = ref<boolean>(true);
const paging = ref<boolean>(true);

const items = ref();
const headerItems = ref<HeaderItem[]>([]);

export type HeaderItem = Readonly<{
  title: string;
  key: object | string;
  value?: string;
  sortable?: boolean;
}>;

function buildHeaderItems(): QTableColumn[] {
  try {
    if (!rows.value[0]) return [];
    return rows.value[0].map((element, index) => {
      if (typeof element === 'string') {
        return {
          name: element,
          label: element,
          field: index as unknown as string,
        };
      } else {
        throw new Error(`Invalid element type: ${typeof element}`);
      }
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}
const exportTypes: string[] = ['xlsx', 'xlsb', 'csv', 'html'];

let cell = 0;

function resetCell() {
  cell = 0;
}

const getRowsCols = (data: DataSet, sheetName: string): RowCol => {
  const sheet = data[sheetName];
  if (!sheet) {
    throw new Error(`Sheet not found: ${sheetName}`);
  }

  const rows = utils.sheet_to_json<Row>(sheet, { header: 1 });
  const range = utils.decode_range(sheet['!ref'] || 'A1');
  if (!range) {
    throw new Error(`Range not found: ${sheetName}`);
  }

  return {
    rows,
    cols: Array.from({ length: range.e.c + 1 }, (_, i) => ({
      field: String(i),
      label: utils.encode_col(i),
      display: makeDisplay(i),
    })),
  };
};

const makeDisplay =
  (col: number): RowCB =>
  (row: Row) =>
    `<span
  style="user-select: none; display: block"
  onblur="endEdit(event)" ondblclick="startEdit(event)"
  position="${Math.floor(cell++ / columns.value.length)}.${col}"
  onkeydown="endEdit(event)">${row?.[col] ?? '&nbsp;'}</span>`;

declare global {
  interface Window {
    startEdit: (ev: MouseEvent) => void;
    endEdit: (ev: FocusEvent | KeyboardEvent) => void;
  }
}

window.startEdit = function (ev: MouseEvent) {
  (ev?.target as HTMLSpanElement).contentEditable = 'true';
};
window.endEdit = function (ev: FocusEvent | KeyboardEvent) {
  if (
    typeof (ev as KeyboardEvent).key == 'undefined' ||
    (ev as KeyboardEvent).key === 'Enter'
  ) {
    const pos = (ev.target as HTMLSpanElement)
      ?.getAttribute('position')
      ?.split('.');
    if (!pos) return;
    (ev?.target as HTMLSpanElement).contentEditable = 'true';

    rows.value[+pos[0]][+pos[1]] = (ev.target as HTMLSpanElement).innerText;

    workBook.value[currSheet.value] = utils.json_to_sheet(rows.value, {
      header: columns.value.map((col: Column) => col.field),
      skipHeader: true,
    });
  }
};

async function importAB(ab: ArrayBuffer, name: string): Promise<void> {
  loading.value = true;
  const data = read(ab);

  currFileName.value = name;
  currSheet.value = data.SheetNames?.[0];
  sheets.value = data.SheetNames;
  workBook.value = data.Sheets;
  loading.value = false;

  selectSheet(currSheet.value);
}

async function importFile(ev: Event): Promise<void> {
  const file = (ev.target as HTMLInputElement)?.files?.[0];
  if (!file) return;
  await importAB(await file.arrayBuffer(), file.name);
}

function exportFile(type: string): void {
  const wb = utils.book_new();

  sheets.value.forEach((sheet) => {
    utils.book_append_sheet(wb, workBook.value[sheet], sheet);
  });

  writeFile(wb, `sheet.${type}`);
}

function selectSheet(sheet: string): void {
  const { rows: newRows, cols: newCols } = getRowsCols(workBook.value, sheet);

  resetCell();

  currSheet.value = sheet;
  columns.value = newCols;
  rows.value = dropBlankRow(newRows);
  paging.value = newRows.length > 50;

  items.value = utils.sheet_to_json(workBook.value[sheet]);
}

// onMounted(async () => {
//   const response = await fetch('https://docs.sheetjs.com/pres.numbers');
//   await importAB(await response.arrayBuffer(), 'pres.numbers');
// });

function dropBlankRow(rows: Row[]): Row[] {
  return rows.filter((row) =>
    Object.values(row).some((v) => v !== null && v !== '')
  );
}

defineExpose({
  items,
  headerItems,
});
</script>

<template>
  <div class="flex q-my-md">
    <div class="q-mx-auto">
      <p class="text-h6">
        Auto skill mapping by upload file .csv | .xlsx | .xlsb
      </p>
      <label
        for="file-upload"
        class="q-pa-sm cursor-pointer rounded-borders bg-cyan text-white q-mx-auto flex flex-center"
        style="width: 100px"
      >
        <q-icon name="upload" class="q-mr-xs"></q-icon>
        <span class="text-weight-medium">UPLOAD</span>
      </label>
      <input
        id="file-upload"
        class="hidden"
        type="file"
        @change="importFile"
        accept=".csv,.xlsx,.xlsb"
      />
    </div>
  </div>

  <div class="q-gutter-md flex flex-center">
    <q-btn
      outlined
      class="cursor-pointer no-shadow"
      v-for="(sheet, idx) in sheets"
      :key="idx"
      @click="selectSheet(sheet)"
      :class="[currSheet === sheet ? 'selected' : '']"
    >
      {{ sheet }}
    </q-btn>
    <q-btn-dropdown color="secondary" label="Export" v-if="currFileName">
      <q-list>
        <q-item
          v-for="(type, idx) in exportTypes"
          :key="idx"
          clickable
          v-close-popup
          @click="exportFile(type)"
        >
          <q-item-label>
            <q-item-label>{{ `.${type}` }}</q-item-label>
          </q-item-label>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
  <q-table
    class="q-mt-xl"
    :rows="rows.slice(1)"
    :columns="buildHeaderItems()"
    row-key="id"
  >
  </q-table>
</template>

<style scoped></style>
