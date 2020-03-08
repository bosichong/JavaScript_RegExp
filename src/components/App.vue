
<template>
  <v-app id="inspire">
    <!-- 左侧抽屉导航 -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-human-greeting</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>关于我</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-application</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>关于本程序</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <!-- 顶部导航 ico -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- 顶部导航文字 -->
      <v-toolbar-title>Vue_Vuetify_RegExp</v-toolbar-title>
    </v-app-bar>

    <v-content>
      
        <div class="d-block">
          <v-textarea type="text"  label="待匹配的文本" v-model="textSour" @click="reptest"></v-textarea>
        </div>

        <div class="d-block">
          <v-text-field type="text" label="正则表达式" v-model="textPattern"></v-text-field>
        </div>

        <div class="d-block">
          <v-textarea type="text" label="匹配结果" ></v-textarea>
        </div>
      
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>
	
	<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: false,
    textSour:"",
    textPattern:""
    
  }),
  methods:{
      reptest:function(){
          alert("hello")
      }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>




<style lang="">
</style>