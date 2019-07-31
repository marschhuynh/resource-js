import { FilterService } from '../../dist'

const filter = new FilterService({type: { key: 'type', value: 'student' }})
filter.activeFilter('name', { key: 'name', value: 'thien' })
filter.activeFilter('age', { 
    key: 'age', 
    op: 'or', 
    value: [
        { key: 'age', op: 'gt', value: 24 },
        { key: 'age', op: 'lt', value: 30 }
    ]
}
)

console.log('Query', JSON.stringify(filter.compileFilter(), null, 2))
