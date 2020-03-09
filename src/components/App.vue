
<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left clipped-right>
      <!-- 顶部导航 ico -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- 顶部导航文字 -->
      <v-toolbar-title>JavaScript_RegExp</v-toolbar-title>
    </v-app-bar>
    <!-- 左侧抽屉导航 -->
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link @click.stop="abme_dialog=true">
          <v-list-item-action>
            <v-icon>mdi-human-greeting</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >关于我</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click.stop="app_dialog=true">
          <v-list-item-action>
            <v-icon>mdi-application</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title >关于本程序</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

<!-- 关于我提示框 -->
      <v-dialog
      v-model="abme_dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="headline">About Me</v-card-title>

        <v-card-text>
            <p>关于我？真的没什么好说的，如果你喜欢编程，喜欢Python或是JavaScript那我们就是朋友了。</p>
            <p>Python/Javascript学习QQ群号：217840699</p>
          
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="abme_dialog = false"
          >
            Close Dialog
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- 关于本程序的提示框 -->
      <v-dialog
      v-model="app_dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="headline">About App</v-card-title>

        <v-card-text>
            本程序纯粹是为了学习Vue、webpack、Vuetify，一个重复制造轮子的的实践。欢迎大家交流学习。
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="app_dialog = false"
          >
            Close Dialog
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-navigation-drawer>

    <v-content>
      <div class="d-block">
        <v-textarea type="text" label="待匹配的文本" v-model="textSour" @input="reptest"></v-textarea>
      </div>

      <div class="d-block">
        <v-row>
          <v-col cols="12" md="9">
            <v-text-field type="text" label="正则表达式" v-model="textPattern" @input="reptest"></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-checkbox v-model="rep_g" label="G" required @change="reptest" v-on="on"></v-checkbox>
              </template>
              <span>全局匹配</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-checkbox v-model="rep_i" label="I" required @change="reptest" v-on="on"></v-checkbox>
              </template>
              <span>忽略大小写</span>
            </v-tooltip>
          </v-col>
          <v-col cols="12" md="1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-checkbox v-model="rep_m" label="M" required @change="reptest" v-on="on"></v-checkbox>
              </template>
              <span>多行匹配</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </div>

      <div class="d-block">
        <v-textarea type="text" label="匹配结果" v-model="textMatchResult" disabled></v-textarea>
      </div>

      <div class="d-block">
        <v-text-field type="text" label="替换文本" v-model="textReplace" @input="reptest"></v-text-field>
      </div>

      <div class="d-block">
        <v-textarea type="text" label="替换结果" v-model="textReplaceResult" disabled></v-textarea>
      </div>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 By J.sky Python/Javascript学习QQ群号：217840699 </span>
    </v-footer>
  </v-app>
</template>
	
	<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: true,
    abme_dialog:false,
    app_dialog:false,
    textSour: "",
    textPattern: "",
    textMatchResult: "",
    textReplace: "",
    textReplaceResult: "",
    rep_g: true,
    rep_i: false,
    rep_m: false
  }),
  methods: {
    itemck: function(regex) {
      console.log(regex);
    },
    reptest: function() {
      var op = ""; //组装正则表达式修饰符
      if (this.rep_g) op = "g";
      if (this.rep_i) op = op + "i";
      if (this.rep_m) op = op + "m";
    //   console.log(this.textSour);

      var regex = new RegExp(this.textPattern, op); //创建RegExp对象。
      var result = this.textSour.match(regex);
    //   console.log(result);

      // 如果没有匹配提示信息
      if ("" == this.textPattern || null == result || 0 == result.length) {
        this.textMatchResult = "（没有匹配）";
        return false;
      }

      if (this.rep_g) {
        var strResult = "共找到 " + result.length + " 处匹配：\r\n";
        for (let i = 0; i < result.length; ++i) {
          strResult = strResult + result[i] + "\r\n";
        }

        this.textMatchResult = strResult;
      } else {
        this.textMatchResult =
          "匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0];
      }
      //如果可以替换字符，则替换。

      if (this.textReplace == "") {
        this.textReplaceResult = "";
      } else {
        this.textReplaceResult = this.textSour.replace(regex, this.textReplace);
      }
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};

console.error("关于我？真的没什么好说的，如果你喜欢编程，喜欢Python或是JavaScript那我们就是朋友了。");
console.error("本程序纯粹是为了学习Vue、webpack、Vuetify，一个重复制造轮子的的实践。欢迎大家交流学习。");
console.error("Python/Javascript学习QQ群号：217840699");




</script>




<style lang="">
</style>