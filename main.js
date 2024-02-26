/**
1. Xây dựng chức năng hiển thị (2 điểm)
Hiển thị danh sách sản phẩm theo dạng table
2. Xây dựng chức năng xóa (2 điểm)
Xóa sản phẩm: 1đ
Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate form: 0.5đ
4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
Cập nhật sản phẩm: 1đ
Hiển thị thông báo sau khi cập nhật: 0.5đ
Validate form: 0.5đ
5. Xây dựng chức năng đăng nhập (1 điểm) 
Đăng nhập thành công : 0.5đ
Thông báo sau khi đăng nhập thành công: 0.5đ
6. Xây dựng giao diện sử dụng bootstrap hoặc tailwindcss (1 điểm)
*/

// 1. hiển thị
const tbody = document.querySelector("tbody");
const btnAdd = document.querySelector(`.btn-add`);
const content = document.querySelector(`.content`);
const url = "http://localhost:3000/products";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const html = data
      .map((pro) => {
        return `
      <tr>
            <td>${pro.id}</td>
            <td>${pro.name}</td>
            <td>${pro.price}</td>
            <td><button class="btn-update" data-id="${pro.id}">Sủa</button><button class="btn-del" data-id="${pro.id}">Xóa</button></td>
        </tr>
        `;
      })
      .join("");
    tbody.innerHTML += html;
    const btnDel = document.querySelectorAll(`.btn-del`);
    // console.log(btnDel);
    for (const btn of btnDel) {
      btn.addEventListener("click", function () {
        if (confirm("Bạn chắc chắn muốn xóa chứ!")) {
          //   alert(btn.dataset.id);
          const id = btn.dataset.id;
          removePro(id);
        }
      });
    }
    // sua
    const btnUpdate = document.querySelectorAll(`.btn-update`);
    // console.log(btnDel);
    for (const btn of btnUpdate) {
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        fetch(`${url}/${id}`)
          .then((res) => res.json())
          .then((data) => {
            content.innerHTML = /*html */ `
            <form action="">
              <input type="text" name="" id="pro_name" placeholder="Tên sản phẩm" value="${data.name}"/>
              <input type="text" name="" id="pro_price" placeholder="Giá sản phẩm" value="${data.price}"/>
              <input type="submit" value="Sửa sản phấm" class="btn-submit" />
            </form>
            `;
            const btnSubmit = document.querySelector(`.btn-submit`);
            const pro_name = document.querySelector(`#pro_name`);
            const pro_price = document.querySelector(`#pro_price`);
            btnSubmit.addEventListener("click", function (e) {
              e.preventDefault();
              if (pro_name.value == "") {
                alert("Bạn chưa nhập tên sản phẩm");
                pro_name.forcus();
                return false;
              } else if (pro_price.value == "") {
                alert("Bạn chưa nhập giá sản phẩm");
                pro_price.forcus();
                return false;
              } else if (isNaN(Number(pro_price.value))) {
                alert("Hãy nhập một mức giá chính xác");
                pro_price.forcus();
                return false;
              } else if (Number(pro_price.value) <= 0) {
                alert("Giá sản phẩm không được âm");
                pro_price.forcus();
                return false;
              }
              const new_pro = {
                id: id,
                name: pro_name.value,
                price: Number(pro_price.value),
              };
              // console.log(new_pro);
              // ham sua san pham
              updatePro(id, new_pro);
            });
          })
          .catch((err) => console.log(err));
      });
    }
  })
  .catch((err) => console.log(err));

// xoa
const removePro = function (id) {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(() => {
      alert("xoa thanh cong");
    })
    .catch((err) => console.log(err));
};
// them
btnAdd.addEventListener("click", function () {
  content.innerHTML = /*html */ `
  <form action="">
    <input type="text" name="" id="pro_name" placeholder="Tên sản phẩm" />
    <input type="text" name="" id="pro_price" placeholder="Giá sản phẩm" />
    <input type="submit" value="Thêm sản phấm" class="btn-submit" />
  </form>
  `;
  const btnSubmit = document.querySelector(`.btn-submit`);
  const pro_name = document.querySelector(`#pro_name`);
  const pro_price = document.querySelector(`#pro_price`);
  btnSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    if (pro_name.value == "") {
      alert("Bạn chưa nhập tên sản phẩm");
      pro_name.forcus();
      return false;
    } else if (pro_price.value == "") {
      alert("Bạn chưa nhập giá sản phẩm");
      pro_price.forcus();
      return false;
    } else if (isNaN(Number(pro_price.value))) {
      alert("Hãy nhập một mức giá chính xác");
      pro_price.forcus();
      return false;
    } else if (Number(pro_price.value) <= 0) {
      alert("Giá sản phẩm không được âm");
      pro_price.forcus();
      return false;
    }
    const new_pro = {
      name: pro_name.value,
      price: Number(pro_price.value),
    };
    // console.log(new_pro);
    addPro(new_pro);
  });
});
// ham them
const addPro = function (data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Bạn đã thê sản phẩm thành công");
    })
    .catch((err) => console.log(err));
};

// ham sua
const updatePro = function (id, data) {
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      alert("Bạn đã sủa sản phẩm thành công");
    })
    .catch((err) => console.log(err));
};
