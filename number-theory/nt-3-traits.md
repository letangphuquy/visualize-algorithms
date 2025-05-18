!!! danger "Định nghĩa"
    - Khái niệm chia hết có thể xem lại trong bài "Làm quen với Ước số".
    - Chia có dư: Nếu lấy $a$ chia cho $b$ được dư là $r$, thương là $q$ thì ta có thể viết: $a = b\cdot q + r$ trong đó $0 \le r < b$
    
???+ note "Giải thích"
    Để hiểu rõ hơn về khái niệm chia hết, có thể nhìn nhận mối liên hệ giữa các phép tính cơ bản (cộng, trừ, nhân, chia) như sau:
    - Phép nhân thực chất là phép cộng nhiều lần. Ví dụ: có $5$ lớp học, mỗi lớp có $40$ học sinh. Vậy tổng số học sinh sẽ là $40 + 40 + 40 + 40 + 40 \text{ (cộng 5 lần vì có 5 lớp) } = 200 = 40 \times 5$.
    - Phép chia thực chất là phép trừ nhiều lần.
    *Ví dụ:* có $12$ viên kẹo, mỗi bạn nhận đúng $3$ viên. Hỏi sẽ có bao nhiêu bạn được nhận kẹo?
    Để trả lời câu hỏi này, ta liên hệ với thực tế: lần lượt lấy ra $3$ viên kẹo và chia cho một bạn nào đó, cho tới khi không còn đủ kẹo nữa. 
    Quá trình này sẽ diễn ra như sau:
        1. Lần $1$: Lấy ra $3$ viên từ $12$ viên kẹo, cho bạn thứ nhất, còn lại $12 - 3 = 9$ viên
        1. Lần $2$: Lấy ra $3$ viên từ $9$ viên kẹo, cho bạn thứ hai, còn lại $9 - 3 = 6$ viên
        1. Lần $3$: Lấy ra $3$ viên từ $6$ viên kẹo, cho bạn thứ ba, còn lại $6 - 3 = 3$ viên
        1. Lần $4$: Lấy ra $3$ viên từ $3$ viên kẹo, cho bạn thứ tư, còn lại $3 - 3 = 0$ viên
      Sau $4$ lần lấy, không còn viên kẹo nào, nên có $4$ bạn được nhận kẹo.
      Số $4$ cũng là kết quả của phép chia $12$ cho $3$.
        1. Trong ví dụ trên, nếu ta có $14$ viên kẹo, thì sau lần lấy kẹo thứ $4$, ta sẽ còn lại $14 - 3 \times 4 = 2$ viên kẹo. 
       Hai viên kẹo này dư ra và không đem chia cho bạn nào cả. Ta nói rằng $14$ chia cho $3$ dư $2$.
    - Cộng và trừ là hai phép tính trái ngược nhau. Tương tự như vậy, nhân và chia cũng là hai phép tính trái ngược nhau.

!!! success "Dấu hiệu chia hết"
    Các dấu hiệu dưới đây chỉ phụ thuộc vào chữ số của số tự nhiên $n$ nào đó mà ta đang xét tới.
    1. $n$ chia hết cho $5$ $\Leftrightarrow$ chữ số hàng đơn vị của nó là $0$ hoặc $5$.
    2. $n$ chia hết cho $2$ $\Leftrightarrow$ chữ số hàng đơn vị của nó là $0,2,4,6$ hoặc $8$
    3. $n$ chia hết cho $3$ $\Leftrightarrow$ tổng các chữ số của nó là một số chia hết cho $3$.
    
    Các dấu hiệu trên có thể được mở rộng như sau:
    - $n$ chia hết cho $9$ $\Leftrightarrow$ tổng các chữ số của nó là một số chia hết cho $9$. (mở rộng từ dấu hiệu $3$ ở trên)
    - $n$ chia hết cho một số $d$ ($d$ có dạng $2^k$ hoặc $5^k$) $\Leftrightarrow$ $k$ chữ số cuối của nó cũng chia hết cho $d$ (mở rộng từ dấu hiệu $1$ và $2$). 
        Ví dụ:
        + $n$ chia hết cho $4$ $\Leftrightarrow$ hai chữ số cuối của $n$ chia hết cho $4$
        + $n$ chia hết cho $8$ $\Leftrightarrow$ ba chữ số cuối của $n$ chia hết cho $8$
        + $n$ chia hết cho $25$ $\Leftrightarrow$ hai chữ số cuối của $n$ chia hết cho $25$
    - $n$ chia hết cho $a \times b$ nếu $n$ thỏa mãn cả hai dấu hiệu chia hết cho $a$ và $b$ $( * )$.
        Ví dụ:
        + $n$ chia hết cho $10$ $\Leftrightarrow$ chữ số hàng đơn vị của nó là $0$.
        + $n$ chia hết cho $6$ $\Leftrightarrow$ tổng các chữ số của nó là một số chia hết cho $3$ \textbf{và} chữ số hàng đơn vị của nó là $0,2,4,6$ hoặc $8$.