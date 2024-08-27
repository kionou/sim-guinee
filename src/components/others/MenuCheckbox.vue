<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <div>
          <input 
            type="checkbox" 
            :id="item.id" 
            v-model="localCheckedItems[item.id]" 
            @change="handleCheckboxChange(item)" 
          />
          <label :for="item.id">{{ item.label }}</label>
          <span v-if="item.children && item.children.length">
            <button @click="toggleChildren(item.id)">
              {{ expandedItems[item.id] ? '-' : '+' }}
            </button>
          </span>
        </div>
        <MenuCheckbox
          v-if="item.children && item.children.length && expandedItems[item.id]"
          :items="item.children"
          :checked-items.sync="localCheckedItems"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuCheckbox',
  props: {
    items: {
      type: Array,
      required: true
    },
    checkedItems: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localCheckedItems: { ...this.checkedItems },
      expandedItems: {}
    };
  },
  watch: {
    checkedItems: {
      deep: true,
      handler(newVal) {
        this.localCheckedItems = { ...newVal };
      }
    }
  },
  methods: {
    emitCheckedItems() {
      this.$emit('update:checkedItems', this.localCheckedItems);
    },
    toggleChildren(itemId) {
      this.expandedItems = {
        ...this.expandedItems,
        [itemId]: !this.expandedItems[itemId]
      };
    },
    handleCheckboxChange(item) {
      if (item.children && item.children.length) {
        this.checkAllChildren(item, this.localCheckedItems[item.id]);
      }
      this.emitCheckedItems();
    },
    checkAllChildren(item, isChecked) {
      item.children.forEach(child => {
        this.localCheckedItems[child.id] = isChecked;
        if (child.children && child.children.length) {
          this.checkAllChildren(child, isChecked);
        }
      });
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

input[type="checkbox"] {
  margin-right: 10px;
}

button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
