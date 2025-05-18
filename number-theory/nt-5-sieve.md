Tài liệu tham khảo:
 - https://vnoi.info/wiki/translate/he/Number-Theory-2.md
 - https://vietcodes.github.io/algo/sieve-eratos

!!! danger "Lý thuyết"
    Ý tưởng chung: ta loại trừ dần từng số. Khi duyệt tới $i$ mà $i$ **chưa bị đánh dấu** thì chắc chắn $i$ là SNT $( * )$. Với mỗi số nguyên tố, ta duyệt qua tất cả bội của nó $i \times 2, i \times 3, i \times 4, \dots, i\times k$ và *đánh dấu* các số này **không phải** là SNT. 
    Vì sao khẳng định được $( * )$?: Vì như vậy đồng nghĩa với việc không có số $j$ nào nhỏ hơn $i$ mà $i$ lại chia hết cho $j$. Nếu có, thì $i$ phải bị đánh dấu tại bước nào trước đó.
    ???+ success "C++"
        ```cpp
        const int N = 1e7 + 50;
        bool is_prime[N];
        
        void sieve(int n) {
        	fill(is_prime, is_prime + 1 + n, true);
        	is_prime[0] = is_prime[1] = false;
        	for (int p = 2; p <= n; p++)
        		if (is_prime[p]) 
        			for (int m = 2*p; m <= n; m += p)
        				is_prime[m] = false;
        }
        ```
    ???+ success "Code Python"
        ```python
        LIMIT = 10**5
        sieve = [True] * (LIMIT + 1)
        sieve[0] = sieve[1] = False
        
        for p in range(2, LIMIT+1):
            if sieve[p]:
                for m in range(2*p, LIMIT+1, p):
                    sieve[m] = False
        ```
        
??? danger "Lời giải"
    https://hackmd.io/@lqdoj/cd5sangnguyento