??? success "Lời giải"
    https://hackmd.io/@lqdoj/cdsohoc2

!!! danger "Lý thuyết"
    1. Gọi $d$ là ước chung của $a,b$ nếu cả $a,b$ đều chia hết cho $d$
    Trong các ước chung đó, số $g$ lớn nhất được gọi là "Ước chung lớn nhất" (UCLN, tiếng Anh là Greatest Common Divisor - GCD). 
    2. Tương tự với bội chung. Số $m$ là bội chung của $a,b$ nếu như $m$ chia hết cho cả $a$ và $b$.
    Khi nói bội chung nhỏ nhất, ta hiểu là đang nói **bội số dương**.
    Các cách viết khác: BCNN (viết tắt), Lowest common multiple - LCM (tiếng Anh).
    0. $\gcd(a,b) = \gcd(b,a)$. Tương tự, $\text{lcm}(a,b) = \text{lcm}(b,a)$. **Đặc biệt:** $\gcd(0,a) = a$
    3. $\gcd(a,b) \times \text{lcm}(a,b) = a \times b$
    4. Có thể dùng thuật toán Euclid để tìm nhanh UCLN của hai số.
        - Nếu $d$ là ước chung của $a,b$ thì $a+b$ và $a-b$ chia hết $d$.
    5. Ta có tính chất: Nếu $g$ là UCLN của $a,b$ thì ta có thể viết:
        - $a = g\cdot x$
        - $b = g\cdot y$
        - Trong đó $x,y$ là hai số nguyên, $x,y$ "nguyên tố cùng nhau" (tức $\gcd(x,y) = 1$) 
    Tương tự, nếu $m$ là BCNN của $a,b$ thì ta viết:
        - $m = a\cdot u$
        - $m = b\cdot v$
        - Trong đó $u,v$ nguyên tố cùng nhau.

???+ warning "Ví dụ"
    - $20$ là bội của $5$ vì $20 = 5 \times 4$, $20 \vdots 5$. Từ phép tính này, cũng có thể suy ra $4$ là ước của $20$.
    - $12,18$ có các ước chung là $1,2,3,6$. Nếu xét cả ước âm, thì $-1,-2,-3,-6$ cũng là ước chung của $12,18$.
    Dễ thấy $6$ là ƯCLN của $12,18$.
    - $12,18$ có các bội chung là $36,72,108,\dots$. Nếu tính số âm, sẽ có cả $-36,-72,-108,\dots$. Nếu BCNN có bao gồm số âm thì sẽ không tìm được số bé nhất!. Theo định nghĩa, chúng ta thấy $36$ là BCNN của $12,18$.
    
!!! success "Thuật toán Euclid"
    TODO!
    Dựa vào điều $4$ ở trên, ta có: $\gcd(a,b) = \gcd(a-b, b)$.
    Thuật toán: Chừng nào cả hai số đều *dương*, ta lấy số bé trừ cho số lớn. Khi một số bằng $0$, UCLN chính bằng số còn lại.
    Cách làm trên quá chậm với $a = 10^9, b = 2$. Để thực hiện việc trừ được nhanh hơn, ta sử dụng **phép chia lấy dư** !!! (xem đề bài adventure1).
    Độ phức tạp: $O(\log(a+b))$
    ???+ "Code"
        C++:
        ```cpp
        int gcd(int a, int b) {
            if (b == 0) return a;
            return gcd(b, a%b);
        }
        ```
        ___
        Python:
        ```python
        def gcd(a,b):
            if b == 0: return a
            return gcd(b, a % b)
        ```
        
!!! warning "Cách sử dụng hàm có sẵn"
    TODO!
    - C++: Lưu ý cần phải có `include<bits/stdc++.h>`
    ```cpp
    int a,b;
    cout << __gcd(a,b); // hai dấu gạch dưới _
    ```
    - Python:
    ```python
    import math
    a,b = map(int, input().split()) # nhập vào hai số
    math.gcd(a,b)
    ```