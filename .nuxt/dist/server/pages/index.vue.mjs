import { ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import TheHeader from "../Components/Header.vue.mjs";
import TheFooter from "../Components/Footer.vue.mjs";
import { useThemeStore } from "../store/DarkMode.mjs";
import "C:/Users/admin/Documents/Front_End_Web_Hotel_Nhom_2/node_modules/hookable/dist/index.mjs";
/* empty css            */
import _export_sfc from "../_virtual/_plugin-vue_export-helper.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = useThemeStore();
    const slides = [
      "https://i.pinimg.com/474x/37/1b/9d/371b9db419f921678ba63cd57e49b129.jpg",
      "https://i.pinimg.com/474x/6e/56/24/6e5624ec98a5cc44fd9711950a2b6a16.jpg",
      "https://i.pinimg.com/474x/9c/63/85/9c6385dd9d75757283b356754077afe7.jpg"
    ];
    const currentSlide = ref(0);
    const services = ref([
      {
        title: "Phòng Deluxe View Biển",
        description: "Không gian hiện đại, tiện nghi, tầm nhìn biển rộng mở.",
        image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1"
      },
      {
        title: "Spa & Chăm sóc sức khỏe",
        description: "Thư giãn tuyệt đối với liệu pháp chăm sóc chuyên sâu.",
        image: "https://images.unsplash.com/photo-1600508771804-06cbfb62b8d6"
      },
      {
        title: "Ẩm thực & Nhà hàng",
        description: "Thưởng thức món ngon Á – Âu trong không gian sang trọng.",
        image: "https://images.unsplash.com/photo-1555992336-cbf2e4fc9c79"
      },
      {
        title: "Tour khám phá Đà Nẵng",
        description: "Trọn gói city tour – khám phá các địa danh nổi tiếng.",
        image: "https://images.unsplash.com/photo-1533106418989-88406c7cc8e1"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_va_button = resolveComponent("va-button");
      const _component_va_card = resolveComponent("va-card");
      const _component_va_card_title = resolveComponent("va-card-title");
      const _component_va_card_content = resolveComponent("va-card-content");
      const _component_va_card_actions = resolveComponent("va-card-actions");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [{ "dark": unref(theme).isDarkMode }, "home-container"]
      }, _attrs))} data-v-a1cdb76e><header data-v-a1cdb76e>`);
      _push(ssrRenderComponent(TheHeader, null, null, _parent));
      _push(`</header><div class="slideshow" data-v-a1cdb76e><img${ssrRenderAttr("src", slides[currentSlide.value])} class="slide-img" data-v-a1cdb76e><div class="slide-overlay" data-v-a1cdb76e><h1 data-v-a1cdb76e>Chào mừng đến với OceanView Resort &amp; Hotel</h1><p data-v-a1cdb76e>Trải nghiệm kỳ nghỉ tuyệt vời với dịch vụ đẳng cấp và view biển thơ mộng.</p>`);
      _push(ssrRenderComponent(_component_va_button, {
        color: "white",
        "text-color": "primary",
        class: "explore-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Khám phá ngay`);
          } else {
            return [
              createTextVNode("Khám phá ngay")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="video-section" data-v-a1cdb76e><h2 data-v-a1cdb76e>Giới thiệu về khách sạn</h2><video controls autoplay muted loop class="intro-video" data-v-a1cdb76e><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" data-v-a1cdb76e> Trình duyệt của bạn không hỗ trợ video. </video></div>`);
      _push(ssrRenderComponent(_component_va_card, {
        class: "section services",
        outlined: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-a1cdb76e${_scopeId}>Dịch vụ nổi bật</h2><div class="cards" data-v-a1cdb76e${_scopeId}><!--[-->`);
            ssrRenderList(services.value, (service) => {
              _push2(ssrRenderComponent(_component_va_card, {
                key: service.title,
                class: "card",
                outlined: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", service.image)} class="card-img" data-v-a1cdb76e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_va_card_title, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(service.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(service.title), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_va_card_content, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p data-v-a1cdb76e${_scopeId3}>${ssrInterpolate(service.description)}</p>`);
                        } else {
                          return [
                            createVNode("p", null, toDisplayString(service.description), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_va_card_actions, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_va_button, {
                            preset: "plain",
                            color: "primary"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Xem chi tiết`);
                              } else {
                                return [
                                  createTextVNode("Xem chi tiết")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_va_button, {
                              preset: "plain",
                              color: "primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Xem chi tiết")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("img", {
                        src: service.image,
                        class: "card-img"
                      }, null, 8, ["src"]),
                      createVNode(_component_va_card_title, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(service.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_va_card_content, null, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(service.description), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_va_card_actions, null, {
                        default: withCtx(() => [
                          createVNode(_component_va_button, {
                            preset: "plain",
                            color: "primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Xem chi tiết")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("h2", null, "Dịch vụ nổi bật"),
              createVNode("div", { class: "cards" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(services.value, (service) => {
                  return openBlock(), createBlock(_component_va_card, {
                    key: service.title,
                    class: "card",
                    outlined: ""
                  }, {
                    default: withCtx(() => [
                      createVNode("img", {
                        src: service.image,
                        class: "card-img"
                      }, null, 8, ["src"]),
                      createVNode(_component_va_card_title, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(service.title), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_va_card_content, null, {
                        default: withCtx(() => [
                          createVNode("p", null, toDisplayString(service.description), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_va_card_actions, null, {
                        default: withCtx(() => [
                          createVNode(_component_va_button, {
                            preset: "plain",
                            color: "primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Xem chi tiết")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_va_card, {
        class: "promo",
        color: "info",
        gradient: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 data-v-a1cdb76e${_scopeId}>🎉 Ưu đãi đặc biệt</h2><p data-v-a1cdb76e${_scopeId}>Giảm 20% khi đặt phòng trong tuần này! Áp dụng đến 15/04/2025.</p>`);
            _push2(ssrRenderComponent(_component_va_button, {
              color: "white",
              "text-color": "primary",
              class: "mt-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Đặt ngay`);
                } else {
                  return [
                    createTextVNode("Đặt ngay")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("h2", null, "🎉 Ưu đãi đặc biệt"),
              createVNode("p", null, "Giảm 20% khi đặt phòng trong tuần này! Áp dụng đến 15/04/2025."),
              createVNode(_component_va_button, {
                color: "white",
                "text-color": "primary",
                class: "mt-2"
              }, {
                default: withCtx(() => [
                  createTextVNode("Đặt ngay")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<footer data-v-a1cdb76e>`);
      _push(ssrRenderComponent(TheFooter, null, null, _parent));
      _push(`</footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a1cdb76e"]]);
export {
  index as default
};
//# sourceMappingURL=index.vue.mjs.map
