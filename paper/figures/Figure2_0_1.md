# **Figure 1: Tripartite State Architecture**

A narrative state $s$ is formally structured into three functionally distinct components: the invariant core $s_{core}$, the dynamic reasoning field $s_{field}$, and the projection state $s_{projection}$.  
Both $s_{core}$ and $s_{field}$ are computed in parallel from the input $x$, where $s_{core} = f_{core}(x)$ captures invariant observational facts, and $s_{field} = f_{field}(x, C)$ represents the dynamic reasoning process conditioned on contextual memory $C$.  
The projection state is defined as $s_{projection} = f_{proj}(s_{core}, s_{field})$, integrating invariant and dynamic components into a low-dimensional semantic representation.  
The invariant core is subsequently canonicalized and mapped to a deterministic identifier T25 via a cryptographic hash function.  
This architecture enforces a strict separation between invariant and dynamic components, preventing circular dependencies and ensuring that all derived representations are functions of canonicalized observations.


```
              x (Input)
             /        \
            ↓          ↓
     s_core = f_core(x)   s_field = f_field(x, C)
            \          /
             ↓        ↓
          s_projection = f_proj(s_core, s_field)
                    ↓
                T25(s_core)
```


# **Figure 2: State Transition Dynamics**

At each time step, multiple candidate worldlines are generated and evaluated using the objective function $J$. The selection of the next state is performed via Boltzmann sampling, where the probability of each candidate is determined by a temperature parameter $T(H)$ derived from the current entropy $H$.  
This formulation enforces a strict separation between deterministic scoring and stochastic selection. High entropy leads to elevated temperature and promotes exploratory sampling, while decreasing entropy lowers the temperature, resulting in convergence toward low-energy states.


```
s_t
 ↓
[ Candidate Worldlines ]
 ↓
[ Scoring J ]
 ↓
[ Boltzmann Selection ]
 ↓
s_{t+1}
```

# **Figure 3: Temporal response distribution of counter-narrative emergence.**  

The histogram shows the empirical distribution of response delays $\Delta t = t_- - t_+$ for narrative pairs sharing an identical invariant core (T25). The red dashed curve represents the maximum likelihood exponential fit $p(\Delta t) = \lambda e^{-\lambda \Delta t}$ with $\hat{\lambda} = 1 / \mathbb{E}[\Delta t]$.  
To evaluate whether the observed temporal structure arises from causal dependency, we compare the distribution against a shuffled baseline in which timestamps are randomly permuted. A Kolmogorov–Smirnov test yields $D = 0.4917$ with $p < 10^{-170}$, strongly rejecting the null hypothesis of random temporal ordering.  
The inset shows the empirically estimated hazard function $\lambda(t)$, which deviates from a constant rate, indicating non-Poissonian dynamics.  
These results demonstrate that counter-narrative emergence follows a structured temporal response rather than independent stochastic events.


# **Figure 4: Entropy Comparison (Pair vs Noise)**

For each pair of narrative states, entropy is computed from the variance of their aggregated state vectors in the semantic space. We compare two conditions: (i) pairs sharing an identical invariant core (T25), and (ii) randomly sampled pairs drawn from unrelated events.  
The results show a significant reduction in entropy for structurally related pairs compared to random combinations. A permutation test (1,000 iterations) yields $p < 0.001$, confirming that the observed entropy suppression cannot be explained by random pairing.  
This effect indicates that opposing narratives derived from a shared invariant core exhibit structured interference, leading to reduced uncertainty in the combined representation. In contrast, randomly paired narratives do not exhibit this behavior, maintaining higher entropy.  
These findings support the interpretation that entropy reduction is not a generic property of aggregation, but arises specifically from structurally coupled narrative states.

```
Pair      ███
Noise     █████████
```


# **Figure 5: Semantic Projection Space (R³)**

Narrative states $s \in \mathcal{S}$ are mapped into $\mathbb{R}^3$ via a projection function $\phi(s)$ that approximates the structural divergence $\Delta V_{ij}$ between states.  
The three axes correspond to physically derived observables defined in Section 4.2: Directionality ($x$), Intensity ($y$), and Stability ($z$).  
Distances in the projected space $|\phi(s_i) - \phi(s_j)|_2$ approximate the high-dimensional divergence $\Delta V_{ij}$, enabling geometric interpretation of narrative relationships.  
The projection is trained via metric learning to satisfy approximate bi-Lipschitz bounds, ensuring that relative distances are preserved within bounded distortion.  
This representation provides a minimal and interpretable embedding for analyzing structural variation and clustering behavior in narrative state space.
