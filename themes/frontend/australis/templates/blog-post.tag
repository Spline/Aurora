<blog-post class="content content-{opts.state.content.id}">
  <header search="false"></header>
  <div class="container">
    <div class="owner">
      <img class="image" src="{opts.state.content.owner.image}">
      <div class="name">{opts.state.content.owner.fullName}</div>
      <div class="created">gepostet {(new Date(opts.state.content.created)).toLocaleDateString()}</div>
    </div>
    <h1>{opts.state.content.title}</h1>
    <div riot-tag="raw" class="content" content="{opts.state.content.content}"></div>
  </div>
</blog-post>
