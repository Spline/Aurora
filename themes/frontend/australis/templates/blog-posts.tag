<blog-posts class="collection collection-{ opts.state.object.id }">
  <blog-post each={ opts.state.object.contents } class="content content-{ id }">
    <h2>{ title }</h2>
    <div class="content">{ content }</div>
  </blog-post>
</blog-posts>
