<!--<blog-header></blog-header>-->
<blog-posts class="container collection collection-{opts.state.object.id}">
  <blog-post each={opts.state.object.contents} class="content content-{id}">
    <h2><a href="/{uri}">{title}</a></h2>
    <div class="content">{content.substring(0, 255).trim()}</div>
    <a href="/{uri}">Weiterlesen</a>
  </blog-post>
</blog-posts>
