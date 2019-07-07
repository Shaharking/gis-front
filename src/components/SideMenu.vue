<template>
  <div class="menu1">
    <div class="vertical-menu">
      <a href="#" class="active">Home</a>
      <a href="#">Profile</a>
      <a href="#">Existing travel</a>
      <a href="#">Create a new trip</a>
      <a href="#">List of attractions</a>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style>
.vertical-menu {
  width: 200px;
}

.vertical-menu a {
  background-color: #eee;
  color: black;
  display: block;
  padding: 12px;
  text-decoration: none;
}

.vertical-menu a:hover {
  background-color: #ccc;
}

.vertical-menu a.active {
  background-color: #4caf50;
  color: white;
}
</style>
