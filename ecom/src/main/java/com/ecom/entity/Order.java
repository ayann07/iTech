package com.ecom.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.ecom.entity.enums.OrderStatus;
import com.ecom.entity.enums.PaymentStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    List<OrderItem> orderItems;
    // When dealing with one-to-many relationships like Order and OrderItem, we need to define how related entities behave when their parent entity is updated or deleted.
    // Order is parent entity and OrderItems is child entity
    //     CascadeType.ALL means:
    //     If an Order is saved, all its OrderItems are also saved.
    //     If an Order is deleted, all its OrderItems are also deleted.
    //     If an Order is updated, all its OrderItems are also updated.

    //     Orphan Removal (orphanRemoval = true)

    //     If an OrderItem is removed from the List<OrderItem> in Order, JPA automatically deletes it from the database.
    //     Without orphanRemoval = true, removing an OrderItem from the list would NOT delete it from the DB.

//     When to Use What?
//     Use cascade = CascadeType.ALL → When child entities should follow parent operations (save/update/delete).
//     Use orphanRemoval = true → When removing an entity from a Parent collection should delete it from the database that is from its own child table aswell.

// What Does FetchType.EAGER Do?
// ✅ When you fetch an Order, all its orderItems will be fetched immediately in a single query (using a JOIN).
// ✅ This means that related child entities (OrderItem) are always loaded along with the parent (Order), even if you don’t access them.

// jitni ye sb inverse mapping wali chize hoti h inme hame khud se data dalna padhta hai jab logic likhte hai mappedBy wali chize.


    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private String address;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(unique = true)
    private String paymentSessionId;

}