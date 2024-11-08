// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="introduction.html">Introduction</a></li><li class="chapter-item expanded "><a href="basic_concepts/index.html"><strong aria-hidden="true">1.</strong> Basic concepts</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="basic_concepts/model.html"><strong aria-hidden="true">1.1.</strong> Model</a></li><li class="chapter-item expanded "><a href="basic_concepts/messages.html"><strong aria-hidden="true">1.2.</strong> Messages</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="basic_concepts/messages/input.html"><strong aria-hidden="true">1.2.1.</strong> Input</a></li><li class="chapter-item expanded "><a href="basic_concepts/messages/output.html"><strong aria-hidden="true">1.2.2.</strong> Output</a></li></ol></li><li class="chapter-item expanded "><a href="basic_concepts/widgets.html"><strong aria-hidden="true">1.3.</strong> Widgets</a></li><li class="chapter-item expanded "><a href="basic_concepts/components.html"><strong aria-hidden="true">1.4.</strong> Components</a></li></ol></li><li class="chapter-item expanded "><a href="first_app.html"><strong aria-hidden="true">2.</strong> Your first app</a></li><li class="chapter-item expanded "><a href="component_macro.html"><strong aria-hidden="true">3.</strong> The component macro</a></li><li class="chapter-item expanded "><a href="tricks.html"><strong aria-hidden="true">4.</strong> Tips and tricks</a></li><li class="chapter-item expanded "><a href="efficient_ui/index.html"><strong aria-hidden="true">5.</strong> Efficient UI updates</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="efficient_ui/tracker.html"><strong aria-hidden="true">5.1.</strong> Tracker</a></li><li class="chapter-item expanded "><a href="efficient_ui/factory.html"><strong aria-hidden="true">5.2.</strong> Factories</a></li><li class="chapter-item expanded "><a href="efficient_ui/factory_position.html"><strong aria-hidden="true">5.3.</strong> The position function</a></li></ol></li><li class="chapter-item expanded "><a href="components.html"><strong aria-hidden="true">6.</strong> Components</a></li><li class="chapter-item expanded "><a href="threads_and_async/index.html"><strong aria-hidden="true">7.</strong> Threads and async</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="threads_and_async/worker.html"><strong aria-hidden="true">7.1.</strong> Workers</a></li><li class="chapter-item expanded "><a href="threads_and_async/commands.html"><strong aria-hidden="true">7.2.</strong> Commands</a></li><li class="chapter-item expanded "><a href="threads_and_async/async.html"><strong aria-hidden="true">7.3.</strong> Async components and factories</a></li><li class="chapter-item expanded "><a href="threads_and_async/overview.html"><strong aria-hidden="true">7.4.</strong> Overview</a></li></ol></li><li class="chapter-item expanded "><a href="child_components.html"><strong aria-hidden="true">8.</strong> Child components</a></li><li class="chapter-item expanded "><a href="widget_templates/index.html"><strong aria-hidden="true">9.</strong> Widget templates</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="widget_templates/accessing_nested_template_elements.html"><strong aria-hidden="true">9.1.</strong> Accessing Nested Template Elements</a></li></ol></li><li class="chapter-item expanded "><a href="cli.html"><strong aria-hidden="true">10.</strong> Command Line Interfaces</a></li><li class="chapter-item expanded "><a href="gtk_rs.html"><strong aria-hidden="true">11.</strong> gtk-rs overview</a></li><li class="chapter-item expanded "><a href="resource_bundles.html"><strong aria-hidden="true">12.</strong> Resource Bundles</a></li><li class="chapter-item expanded "><a href="continuous_integration.html"><strong aria-hidden="true">13.</strong> Continuous Integration guide</a></li><li class="chapter-item expanded "><a href="component_macro/reference.html"><strong aria-hidden="true">14.</strong> Component macro reference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="component_macro/expansion.html"><strong aria-hidden="true">14.1.</strong> Macro expansion</a></li></ol></li><li class="chapter-item expanded "><a href="migrations/index.html"><strong aria-hidden="true">15.</strong> Migration guides</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="migrations/0_2_to_0_4.html"><strong aria-hidden="true">15.1.</strong> 0.2 to 0.4</a></li><li class="chapter-item expanded "><a href="migrations/0_4_to_0_5.html"><strong aria-hidden="true">15.2.</strong> 0.4 to 0.5</a></li><li class="chapter-item expanded "><a href="migrations/0_5_to_0_6.html"><strong aria-hidden="true">15.3.</strong> 0.5 to 0.6</a></li><li class="chapter-item expanded "><a href="migrations/0_6_to_0_7.html"><strong aria-hidden="true">15.4.</strong> 0.6 to 0.7</a></li><li class="chapter-item expanded "><a href="migrations/0_7_to_0_8.html"><strong aria-hidden="true">15.5.</strong> 0.7 to 0.8</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
