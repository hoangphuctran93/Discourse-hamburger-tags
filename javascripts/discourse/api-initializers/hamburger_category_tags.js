import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  try {
    // tag groups
    if (settings.hamburger_menu_tags_mode === "tag groups") {
      fetch("/tag_groups/filter/search.json")
        .then((response) => response.json())
        .then(({ results }) => {
          api.decorateWidget("menu-links:after", (helper) => {
            if (helper.attrs.name !== "general-links") return;
            return [
              helper.attach("hamburger-tags-with-groups", { results }),
              api.h("hr"),
            ];
          });
        });
    }

    // allowed category tags
    if (settings.hamburger_menu_tags_mode === "allowed category tags") {
      api.decorateWidget("menu-links:after", (helper) => {
        if (helper.attrs.name !== "general-links") return;
        return [helper.attach("hamburger-tags-with-categories"), api.h("hr")];
      });
    }

    // top tags
    if (settings.hamburger_menu_tags_mode === "top tags") {
      api.decorateWidget("menu-links:after", (helper) => {
        if (helper.attrs.name !== "general-links") return;
        return [helper.attach("hamburger-tags-top"), api.h("hr")];
      });
    }
  } catch (error) {
    console.error("There's an issue in the hamburger tags theme component");
    console.error(error);
  }
});
