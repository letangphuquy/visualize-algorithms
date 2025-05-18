Tài liệu tham khảo:
 - [anh Quý](https://docs.google.com/document/d/1PXxX1jJ1h03Ixs6CKG3ggKE8f3XtD3t5emB9I80ufB8/edit#heading=h.eznpfrs0dz2i)
 - [USACO](https://usaco.guide/gold/modular?lang=cpp)

!!! danger "Lý thuyết"
    - Số học thường yêu cầu ta phải tính các kết quả *chia lấy dư* cho một số $\texttt{MOD}$ nào đó.
    - Kí hiệu $a \mod b$ là kết quả của phép chia lấy dư $a$ cho $b$.
    - Ta có:
        1. $(a+b) \mod M = ((a \mod M) + (b \mod M)) \mod M$
        2. $(a-b) \mod M = ((a \mod M) - (b \mod M)) \mod M$
        3. $(a*b) \mod M = ((a \mod M) * (b \mod M)) \mod M$
    Nghĩa là: các phép tính cộng, trừ, nhân có thể được thực hiện trước hoặc sau phép tính chia lấy dư *tùy ý*. Do đó, ta **cần** chia lấy dư ngay *mọi lúc* có thể: lúc mới đọc vào input, sau mỗi phép tính, $\dots$ để đảm bảo giá trị tính toán được **đủ nhỏ**.
    **Lưu ý:** phép chia *không* có tính chất trên.  
    
???+ success "Code mẫu"
    Với các bài có công thức toán phức tạp, ví dụ như bài "det3", ta *nên* định nghĩa các hàm cộng, nhân theo modulo như sau:
    ```cpp
    const int MOD = 2004010501;
    int prod(int a, int b) { return 1ll*a*b % MOD; }
    void add(int& var, int add) {
    	var = ((long long) var + add) % MOD;
    	if (var < 0) var += MOD;
    }
    ```
    .. và có thể khai báo thêm các biến phụ, để tách một công thức rất dài ra thành nhiều phần nhỏ để dễ theo dõi, debug hơn.
    Cách sử dụng:
    ```cpp
    int a = 1e9, b = a+1;
    cout << prod(a,b) << '\n'; // tính tích hai số và trả về.
    add(a,b); //cộng b vào biến a.
    cout << a;
    ```