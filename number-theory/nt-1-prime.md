### Tài liệu tham khảo:
 1. [Ước số](https://voh.com.vn/hoc-tap/chuyen-de-sgk-cd-toan-6-uoc-la-gi-cach-tim-uoc-chung-va-uoc-chung-lon-nhat.2372.639.283)
 2. [Số nguyên tố](https://voh.com.vn/hoc-tap/chuyen-de-sgk-cd-toan-6-so-nguyen-to-la-gi-dinh-nghia-va-cac-dang-bai-tap-ung-dung.2369.639.283)

### Code mẫu:
!!! success "Kiểm tra SNT"
     1. Cách làm "ngây thơ"?:
    ```cpp
    bool is_prime_SLOW(int n) {
        if (n < 2) return false;
        for (int i = 2; i < n; i++)
            if (n%i == 0) return false; // n có ước khác 2 và chính nó
        return true;
    }
    ```
    Trong Python:
    ```python
    def check_prime(n):
        if n < 2: return False
        for i in range(2,n):
            if n % i == 0: return False
        return True
    ```
     2. Cách làm tối ưu: Ta chỉ sửa giới hạn của vòng lặp `for`
    Điểm khác biệt là:
    ```cpp
        for (int i = 2; i <= n/i; i++)
    ```
    Hoặc:
    ```python
        for i in range(2, n**0.5 + 1):
    ```
    Code hoàn chỉnh như sau:
    ```cpp
    bool is_prime(long long n) {
        if (n < 2) return false;
        for (int i = 2; i <= n/i; i++)
            if (n%i == 0) return false;
        return true;
    }
    ```
    Hoặc:
    ```python
    def is_prime(n):
        if n < 2: return False
        for i in range(2, n**0.5 + 1):
            if n % i == 0: return False
        return True
    ```

???+ warning "Ứng dụng"
    Ta có thể ứng dụng đoạn code trên để đếm số lượng ước, tính tổng các ước, in ra tất cả ước số, ... tùy yêu cầu đề bài.

???+ success "Bản chất"
    Cách làm trên có độ phức tạp $O(\sqrt{n})$. Vì sao?
    Giải thích:
    Ví dụ, số $n = 100$ có các ước $1,2,4,5,10,20,25,50,100$.
    Nếu "cày trâu", vòng lặp `for` cần chạy qua khoảng $100$ số.
    Tuy nhiên, ta nhận thấy các số đi thành từng cặp:
    
    $$100 = 1\times 100 = 2\times 50 = 4 \times 25 = 5 \times 20 = 10 \times 10$$
    
    Tức là một ước số "bé" sẽ đi với một ước số "lớn". Trong ví dụ trên, giả sử ta đang duyệt `for` và có $i = 4$.
    Vì `n % i == 0` trả về `True` nên $i$ chính là một ước của $100$. Ta lấy $100 \div 4 = 25$ (`100 / i` hoặc `100//i`), $25$ chính là "ước số lớn" đi kèm với số $4$.
    Như vậy, ta chỉ cần chạy `for` tới $10$ là đã lấy được mọi ước của $100$!