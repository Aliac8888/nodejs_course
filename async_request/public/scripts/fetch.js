function handleDeleteTask(btn) {
  const csrfToken = btn.parentNode.querySelector("[name='_csrf']").value;
  const taskId = btn.parentNode.querySelector("[name='taskId']").value;

  fetch("/tasks/delete/" + taskId, {
    method: "DELETE",
    headers: {
      "x-csrf-token": csrfToken,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));
}
