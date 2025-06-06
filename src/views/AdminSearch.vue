<template>
    <div class="admin-search">
        <h2>Admin User Search</h2>
        <ag-grid-vue style="width: 100%; height: 400px;"
                     class="ag-theme-alpine"
                     :columnDefs="columnDefs"
                     :rowData="rowData"
                     :defaultColDef="defaultColDef"
                     data-testid="user-grid"></ag-grid-vue>
    </div>
</template>

<script>
    import { AgGridVue } from 'ag-grid-vue3'
    import 'ag-grid-community/styles/ag-grid.css'
    import 'ag-grid-community/styles/ag-theme-alpine.css'
    import { onMounted, ref } from 'vue'

    export default {
        name: 'AdminSearch',
        components: { AgGridVue },
        setup() {
            const columnDefs = [
                { field: 'firstName', filter: true, headerName: 'First Name' },
                { field: 'lastName', filter: true, headerName: 'Last Name' },
                { field: 'email', headerName: 'Email' },
                { field: 'zip', filter: true, headerName: 'Zip' },
                { field: 'city', filter: true, headerName: 'City' }
            ]
            const rowData = ref([])
            const defaultColDef = {
                sortable: true,
                filter: true,
                resizable: true
            }

            onMounted(async () => {
                try {
                    const response = await fetch('/data/users.json')
                    if (!response.ok) throw new Error('Failed to fetch users')
                    rowData.value = await response.json()
                } catch (error) {
                    console.error('Error fetching users:', error)
                }
            })

            return { columnDefs, rowData, defaultColDef }
        }
    }
</script>

<style scoped>
    .admin-search {
        max-width: 100%;
    }
</style>
