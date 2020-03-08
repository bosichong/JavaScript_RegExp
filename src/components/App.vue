
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
        <v-textarea type="text" label="待匹配的文本" v-model:value="textSour" @input="reptest"></v-textarea>
      </div>

      <div class="d-block">
        <v-row>
          <v-col cols="12" md="9">
            <v-text-field type="text" label="正则表达式" v-model="textPattern" @input="reptest"></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-checkbox v-model="rep_g" label="G" required></v-checkbox>
          </v-col>
          <v-col cols="12" md="1">
            <v-checkbox v-model="rep_i" label="I" required></v-checkbox>
          </v-col>
          <v-col cols="12" md="1">
            <v-checkbox v-model="rep_m" label="M" required></v-checkbox>
          </v-col>
        </v-row>
      </div>

      <div class="d-block">
        <v-textarea type="text" label="匹配结果" v-model="textMatchResult"></v-textarea>
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
    textSour: "",
    textPattern: "",
    textMatchResult: "",
    rep_g: true,
    rep_i: false,
    rep_m: false
  }),
  methods: {
    reptest: function() {
      var op = ""; //组装正则表达式修饰符
      if (this.rep_g) op = "g";
      if (this.rep_i) op = op + "i";
      if (this.rep_m) op = op + "m";
      console.log(this.textSour);
      
      var regex = new RegExp(this.textPattern, op); //创建RegExp对象。
      var result = this.textSour.match(regex);
      console.log(result);
      

      // 如果没有匹配提示信息
      if (null == result || 0 == result.length) {
        this.textMatchResult = "（没有匹配）";
        return false;
      }

      if (this.rep_g) {
        var strResult = "共找到 " + result.length + " 处匹配：\r\n";
        for (var i = 0; i < result.length; ++i){
            strResult = strResult + result[i] + "\r\n";
        }
        
        this.textMatchResult = strResult;
      } else {
        this.textMatchResult =
          "匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0];
      }
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>




<style lang="">
</style>