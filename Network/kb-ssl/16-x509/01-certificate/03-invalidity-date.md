---
type: reference
title: Invalidity Date
description: "RFC 5280 CRL Invalidity Date extension, plus certificate issuer and path validation sections."
tags: [x509, pki, certificates, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#5.3.2"
---

# 5.3.2. Invalidity Date

[↑ Certificate](/Network/kb-ssl/16-x509/01-certificate/README.md)

```text
   The invalidity date is a non-critical CRL entry extension that
   provides the date on which it is known or suspected that the private
   key was compromised or that the certificate otherwise became invalid.
   This date may be earlier than the revocation date in the CRL entry,
   which is the date at which the CA processed the revocation.  When a
   revocation is first posted by a CRL issuer in a CRL, the invalidity
   date may precede the date of issue of earlier CRLs, but the
   revocation date SHOULD NOT precede the date of issue of earlier CRLs.
   Whenever this information is available, CRL issuers are strongly
   encouraged to share it with CRL users.

   The GeneralizedTime values included in this field MUST be expressed
   in Greenwich Mean Time (Zulu), and MUST be specified and interpreted
   as defined in Section 15.1.1.2.4.1.2.5.2.

   id-ce-invalidityDate OBJECT IDENTIFIER ::= { id-ce 24 }

   InvalidityDate ::=  GeneralizedTime
```

#### 15.1.1.2.5.3.3. Certificate Issuer

```text
   This CRL entry extension identifies the certificate issuer associated
   with an entry in an indirect CRL, that is, a CRL that has the
   indirectCRL indicator set in its issuing distribution point
   extension.  When present, the certificate issuer CRL entry extension
   includes one or more names from the issuer field and/or issuer
   alternative name extension of the certificate that corresponds to the
   CRL entry.  If this extension is not present on the first entry in an
   indirect CRL, the certificate issuer defaults to the CRL issuer.  On



Cooper, et al.              Standards Track                    [Page 70]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   subsequent entries in an indirect CRL, if this extension is not
   present, the certificate issuer for the entry is the same as that for
   the preceding entry.  This field is defined as follows:

   id-ce-certificateIssuer   OBJECT IDENTIFIER ::= { id-ce 29 }

   CertificateIssuer ::=     GeneralNames

   Conforming CRL issuers MUST include in this extension the
   distinguished name (DN) from the issuer field of the certificate that
   corresponds to this CRL entry.  The encoding of the DN MUST be
   identical to the encoding used in the certificate.

   CRL issuers MUST mark this extension as critical since an
   implementation that ignored this extension could not correctly
   attribute CRL entries to certificates.  This specification RECOMMENDS
   that implementations recognize this extension.
```

#### 15.1.1.2.6. Certification Path Validation

```text
   Certification path validation procedures for the Internet PKI are
   based on the algorithm supplied in [X.509].  Certification path
   processing verifies the binding between the subject distinguished
   name and/or subject alternative name and subject public key.  The
   binding is limited by constraints that are specified in the
   certificates that comprise the path and inputs that are specified by
   the relying party.  The basic constraints and policy constraints
   extensions allow the certification path processing logic to automate
   the decision making process.

   This section describes an algorithm for validating certification
   paths.  Conforming implementations of this specification are not
   required to implement this algorithm, but MUST provide functionality
   equivalent to the external behavior resulting from this procedure.
   Any algorithm may be used by a particular implementation so long as
   it derives the correct result.

   In Section 15.1.1.2.6.1, the text describes basic path validation.  Valid
   paths begin with certificates issued by a trust anchor.  The
   algorithm requires the public key of the CA, the CA's name, and any
   constraints upon the set of paths that may be validated using this
   key.

   The selection of a trust anchor is a matter of policy: it could be
   the top CA in a hierarchical PKI, the CA that issued the verifier's
   own certificate(s), or any other CA in a network PKI.  The path





Cooper, et al.              Standards Track                    [Page 71]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   validation procedure is the same regardless of the choice of trust
   anchor.  In addition, different applications may rely on different
   trust anchors, or may accept paths that begin with any of a set of
   trust anchors.

   Section 15.1.1.2.6.2 describes methods for using the path validation algorithm
   in specific implementations.

   Section 15.1.1.2.6.3 describes the steps necessary to determine if a
   certificate is revoked when CRLs are the revocation mechanism used by
   the certificate issuer.
```

#### 15.1.1.2.6.1. Basic Path Validation

```text
   This text describes an algorithm for X.509 path processing.  A
   conforming implementation MUST include an X.509 path processing
   procedure that is functionally equivalent to the external behavior of
   this algorithm.  However, support for some of the certificate
   extensions processed in this algorithm are OPTIONAL for compliant
   implementations.  Clients that do not support these extensions MAY
   omit the corresponding steps in the path validation algorithm.

   For example, clients are not required to support the policy mappings
   extension.  Clients that do not support this extension MAY omit the
   path validation steps where policy mappings are processed.  Note that
   clients MUST reject the certificate if it contains an unsupported
   critical extension.

   While the certificate and CRL profiles specified in Sections 4 and 5
   of this document specify values for certificate and CRL fields and
   extensions that are considered to be appropriate for the Internet
   PKI, the algorithm presented in this section is not limited to
   accepting certificates and CRLs that conform to these profiles.
   Therefore, the algorithm only includes checks to verify that the
   certification path is valid according to X.509 and does not include
   checks to verify that the certificates and CRLs conform to this
   profile.  While the algorithm could be extended to include checks for
   conformance to the profiles in Sections 4 and 5, this profile
   RECOMMENDS against including such checks.

   The algorithm presented in this section validates the certificate
   with respect to the current date and time.  A conforming
   implementation MAY also support validation with respect to some point
   in the past.  Note that mechanisms are not available for validating a
   certificate with respect to a time outside the certificate validity
   period.





Cooper, et al.              Standards Track                    [Page 72]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   The trust anchor is an input to the algorithm.  There is no
   requirement that the same trust anchor be used to validate all
   certification paths.  Different trust anchors MAY be used to validate
   different paths, as discussed further in Section 15.1.1.2.6.2.

   The primary goal of path validation is to verify the binding between
   a subject distinguished name or a subject alternative name and
   subject public key, as represented in the target certificate, based
   on the public key of the trust anchor.  In most cases, the target
   certificate will be an end entity certificate, but the target
   certificate may be a CA certificate as long as the subject public key
   is to be used for a purpose other than verifying the signature on a
   public key certificate.  Verifying the binding between the name and
   subject public key requires obtaining a sequence of certificates that
   support that binding.  The procedure performed to obtain this
   sequence of certificates is outside the scope of this specification.

   To meet this goal, the path validation process verifies, among other
   things, that a prospective certification path (a sequence of n
   certificates) satisfies the following conditions:

      (a)  for all x in {1, ..., n-1}, the subject of certificate x is
           the issuer of certificate x+1;

      (b)  certificate 1 is issued by the trust anchor;

      (c)  certificate n is the certificate to be validated (i.e., the
           target certificate); and

      (d)  for all x in {1, ..., n}, the certificate was valid at the
           time in question.

   A certificate MUST NOT appear more than once in a prospective
   certification path.

   When the trust anchor is provided in the form of a self-signed
   certificate, this self-signed certificate is not included as part of
   the prospective certification path.  Information about trust anchors
   is provided as inputs to the certification path validation algorithm
   (Section 15.1.1.2.6.1.1).

   A particular certification path may not, however, be appropriate for
   all applications.  Therefore, an application MAY augment this
   algorithm to further limit the set of valid paths.  The path
   validation process also determines the set of certificate policies
   that are valid for this path, based on the certificate policies
   extension, policy mappings extension, policy constraints extension,
   and inhibit anyPolicy extension.  To achieve this, the path



Cooper, et al.              Standards Track                    [Page 73]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   validation algorithm constructs a valid policy tree.  If the set of
   certificate policies that are valid for this path is not empty, then
   the result will be a valid policy tree of depth n, otherwise the
   result will be a null valid policy tree.

   A certificate is self-issued if the same DN appears in the subject
   and issuer fields (the two DNs are the same if they match according
   to the rules specified in Section 15.1.1.2.7.1).  In general, the issuer and
   subject of the certificates that make up a path are different for
   each certificate.  However, a CA may issue a certificate to itself to
   support key rollover or changes in certificate policies.  These
   self-issued certificates are not counted when evaluating path length
   or name constraints.

   This section presents the algorithm in four basic steps: (1)
   initialization, (2) basic certificate processing, (3) preparation for
   the next certificate, and (4) wrap-up.  Steps (1) and (4) are
   performed exactly once.  Step (2) is performed for all certificates
   in the path.  Step (3) is performed for all certificates in the path
   except the final certificate.  Figure 2 provides a high-level
   flowchart of this algorithm.






























Cooper, et al.              Standards Track                    [Page 74]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


                           +-------+
                           | START |
                           +-------+
                               |
                               V
                       +----------------+
                       | Initialization |
                       +----------------+
                               |
                               +<--------------------+
                               |                     |
                               V                     |
                       +----------------+            |
                       |  Process Cert  |            |
                       +----------------+            |
                               |                     |
                               V                     |
                       +================+            |
                       |  IF Last Cert  |            |
                       |    in Path     |            |
                       +================+            |
                         |            |              |
                    THEN |            | ELSE         |
                         V            V              |
              +----------------+ +----------------+  |
              |    Wrap up     | |  Prepare for   |  |
              +----------------+ |   Next Cert    |  |
                      |          +----------------+  |
                      V               |              |
                  +-------+           +--------------+
                  | STOP  |
                  +-------+

         Figure 2.  Certification Path Processing Flowchart
```

#### 15.1.1.2.6.1.1. Inputs

```text
   This algorithm assumes that the following nine inputs are provided to
   the path processing logic:

      (a)  a prospective certification path of length n.

      (b)  the current date/time.








Cooper, et al.              Standards Track                    [Page 75]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (c)  user-initial-policy-set:  A set of certificate policy
           identifiers naming the policies that are acceptable to the
           certificate user.  The user-initial-policy-set contains the
           special value any-policy if the user is not concerned about
           certificate policy.

      (d)  trust anchor information, describing a CA that serves as a
           trust anchor for the certification path.  The trust anchor
           information includes:

         (1)  the trusted issuer name,

         (2)  the trusted public key algorithm,

         (3)  the trusted public key, and

         (4)  optionally, the trusted public key parameters associated
              with the public key.

      The trust anchor information may be provided to the path
      processing procedure in the form of a self-signed certificate.
      When the trust anchor information is provided in the form of a
      certificate, the name in the subject field is used as the trusted
      issuer name and the contents of the subjectPublicKeyInfo field is
      used as the source of the trusted public key algorithm and the
      trusted public key.  The trust anchor information is trusted
      because it was delivered to the path processing procedure by some
      trustworthy out-of-band procedure.  If the trusted public key
      algorithm requires parameters, then the parameters are provided
      along with the trusted public key.

      (e)  initial-policy-mapping-inhibit, which indicates if policy
           mapping is allowed in the certification path.

      (f)  initial-explicit-policy, which indicates if the path must be
           valid for at least one of the certificate policies in the
           user-initial-policy-set.

      (g)  initial-any-policy-inhibit, which indicates whether the
           anyPolicy OID should be processed if it is included in a
           certificate.

      (h)  initial-permitted-subtrees, which indicates for each name
           type (e.g., X.500 distinguished names, email addresses, or IP
           addresses) a set of subtrees within which all subject names
           in every certificate in the certification path MUST fall.
           The initial-permitted-subtrees input includes a set for each
           name type.  For each name type, the set may consist of a



Cooper, et al.              Standards Track                    [Page 76]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


           single subtree that includes all names of that name type or
           one or more subtrees that each specifies a subset of the
           names of that name type, or the set may be empty.  If the set
           for a name type is empty, then the certification path will be
           considered invalid if any certificate in the certification
           path includes a name of that name type.

      (i)  initial-excluded-subtrees, which indicates for each name type
           (e.g., X.500 distinguished names, email addresses, or IP
           addresses) a set of subtrees within which no subject name in
           any certificate in the certification path may fall.  The
           initial-excluded-subtrees input includes a set for each name
           type.  For each name type, the set may be empty or may
           consist of one or more subtrees that each specifies a subset
           of the names of that name type.  If the set for a name type
           is empty, then no names of that name type are excluded.

   Conforming implementations are not required to support the setting of
   all of these inputs.  For example, a conforming implementation may be
   designed to validate all certification paths using a value of FALSE
   for initial-any-policy-inhibit.
```

#### 15.1.1.2.6.1.2. Initialization

```text
   This initialization phase establishes eleven state variables based
   upon the nine inputs:

      (a)  valid_policy_tree:  A tree of certificate policies with their
           optional qualifiers; each of the leaves of the tree
           represents a valid policy at this stage in the certification
           path validation.  If valid policies exist at this stage in
           the certification path validation, the depth of the tree is
           equal to the number of certificates in the chain that have
           been processed.  If valid policies do not exist at this stage
           in the certification path validation, the tree is set to
           NULL.  Once the tree is set to NULL, policy processing
           ceases.

           Each node in the valid_policy_tree includes three data
           objects: the valid policy, a set of associated policy
           qualifiers, and a set of one or more expected policy values.
           If the node is at depth x, the components of the node have
           the following semantics:

         (1)  The valid_policy is a single policy OID representing a
              valid policy for the path of length x.





Cooper, et al.              Standards Track                    [Page 77]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         (2)  The qualifier_set is a set of policy qualifiers associated
              with the valid policy in certificate x.

         (3)  The expected_policy_set contains one or more policy OIDs
              that would satisfy this policy in the certificate x+1.

      The initial value of the valid_policy_tree is a single node with
      valid_policy anyPolicy, an empty qualifier_set, and an
      expected_policy_set with the single value anyPolicy.  This node is
      considered to be at depth zero.

      Figure 3 is a graphic representation of the initial state of the
      valid_policy_tree.  Additional figures will use this format to
      describe changes in the valid_policy_tree during path processing.

              +----------------+
              |   anyPolicy    |   <---- valid_policy
              +----------------+
              |       {}       |   <---- qualifier_set
              +----------------+
              |  {anyPolicy}   |   <---- expected_policy_set
              +----------------+

      Figure 3.  Initial Value of the valid_policy_tree State Variable

      (b)  permitted_subtrees:  a set of root names for each name type
           (e.g., X.500 distinguished names, email addresses, or IP
           addresses) defining a set of subtrees within which all
           subject names in subsequent certificates in the certification
           path MUST fall.  This variable includes a set for each name
           type, and the initial value is initial-permitted-subtrees.

      (c)  excluded_subtrees:  a set of root names for each name type
           (e.g., X.500 distinguished names, email addresses, or IP
           addresses) defining a set of subtrees within which no subject
           name in subsequent certificates in the certification path may
           fall.  This variable includes a set for each name type, and
           the initial value is initial-excluded-subtrees.

      (d)  explicit_policy:  an integer that indicates if a non-NULL
           valid_policy_tree is required.  The integer indicates the
           number of non-self-issued certificates to be processed before
           this requirement is imposed.  Once set, this variable may be
           decreased, but may not be increased.  That is, if a
           certificate in the path requires a non-NULL
           valid_policy_tree, a later certificate cannot remove this
           requirement.  If initial-explicit-policy is set, then the
           initial value is 0, otherwise the initial value is n+1.



Cooper, et al.              Standards Track                    [Page 78]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (e)  inhibit_anyPolicy:  an integer that indicates whether the
           anyPolicy policy identifier is considered a match.  The
           integer indicates the number of non-self-issued certificates
           to be processed before the anyPolicy OID, if asserted in a
           certificate other than an intermediate self-issued
           certificate, is ignored.  Once set, this variable may be
           decreased, but may not be increased.  That is, if a
           certificate in the path inhibits processing of anyPolicy, a
           later certificate cannot permit it.  If initial-any-policy-
           inhibit is set, then the initial value is 0, otherwise the
           initial value is n+1.

      (f)  policy_mapping:  an integer that indicates if policy mapping
           is permitted.  The integer indicates the number of non-self-
           issued certificates to be processed before policy mapping is
           inhibited.  Once set, this variable may be decreased, but may
           not be increased.  That is, if a certificate in the path
           specifies that policy mapping is not permitted, it cannot be
           overridden by a later certificate.  If initial-policy-
           mapping-inhibit is set, then the initial value is 0,
           otherwise the initial value is n+1.

      (g)  working_public_key_algorithm:  the digital signature
           algorithm used to verify the signature of a certificate.  The
           working_public_key_algorithm is initialized from the trusted
           public key algorithm provided in the trust anchor
           information.

      (h)  working_public_key:  the public key used to verify the
           signature of a certificate.  The working_public_key is
           initialized from the trusted public key provided in the trust
           anchor information.

      (i)  working_public_key_parameters:  parameters associated with
           the current public key that may be required to verify a
           signature (depending upon the algorithm).  The
           working_public_key_parameters variable is initialized from
           the trusted public key parameters provided in the trust
           anchor information.

      (j)  working_issuer_name:  the issuer distinguished name expected
           in the next certificate in the chain.  The
           working_issuer_name is initialized to the trusted issuer name
           provided in the trust anchor information.







Cooper, et al.              Standards Track                    [Page 79]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (k)  max_path_length:  this integer is initialized to n, is
           decremented for each non-self-issued certificate in the path,
           and may be reduced to the value in the path length constraint
           field within the basic constraints extension of a CA
           certificate.

   Upon completion of the initialization steps, perform the basic
   certificate processing steps specified in 6.1.3.
```

#### 15.1.1.2.6.1.3. Basic Certificate Processing

```text
   The basic path processing actions to be performed for certificate i
   (for all i in [1..n]) are listed below.

      (a)  Verify the basic certificate information.  The certificate
           MUST satisfy each of the following:

         (1)  The signature on the certificate can be verified using
              working_public_key_algorithm, the working_public_key, and
              the working_public_key_parameters.

         (2)  The certificate validity period includes the current time.

         (3)  At the current time, the certificate is not revoked.  This
              may be determined by obtaining the appropriate CRL
              (Section 15.1.1.2.6.3), by status information, or by out-of-band
              mechanisms.

         (4)  The certificate issuer name is the working_issuer_name.

      (b)  If certificate i is self-issued and it is not the final
           certificate in the path, skip this step for certificate i.
           Otherwise, verify that the subject name is within one of the
           permitted_subtrees for X.500 distinguished names, and verify
           that each of the alternative names in the subjectAltName
           extension (critical or non-critical) is within one of the
           permitted_subtrees for that name type.

      (c)  If certificate i is self-issued and it is not the final
           certificate in the path, skip this step for certificate i.
           Otherwise, verify that the subject name is not within any of
           the excluded_subtrees for X.500 distinguished names, and
           verify that each of the alternative names in the
           subjectAltName extension (critical or non-critical) is not
           within any of the excluded_subtrees for that name type.






Cooper, et al.              Standards Track                    [Page 80]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (d)  If the certificate policies extension is present in the
           certificate and the valid_policy_tree is not NULL, process
           the policy information by performing the following steps in
           order:

         (1)  For each policy P not equal to anyPolicy in the
              certificate policies extension, let P-OID denote the OID
              for policy P and P-Q denote the qualifier set for policy
              P.  Perform the following steps in order:

            (i)   For each node of depth i-1 in the valid_policy_tree
                  where P-OID is in the expected_policy_set, create a
                  child node as follows: set the valid_policy to P-OID,
                  set the qualifier_set to P-Q, and set the
                  expected_policy_set to
                  {P-OID}.

                  For example, consider a valid_policy_tree with a node
                  of depth i-1 where the expected_policy_set is {Gold,
                  White}.  Assume the certificate policies Gold and
                  Silver appear in the certificate policies extension of
                  certificate i.  The Gold policy is matched, but the
                  Silver policy is not.  This rule will generate a child
                  node of depth i for the Gold policy.  The result is
                  shown as Figure 4.

                             +-----------------+
                             |       Red       |
                             +-----------------+
                             |       {}        |
                             +-----------------+   node of depth i-1
                             |  {Gold, White}  |
                             +-----------------+
                                      |
                                      |
                                      |
                                      V
                             +-----------------+
                             |      Gold       |
                             +-----------------+
                             |       {}        |
                             +-----------------+   node of depth i
                             |     {Gold}      |
                             +-----------------+

                    Figure 4.  Processing an Exact Match





Cooper, et al.              Standards Track                    [Page 81]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


            (ii)  If there was no match in step (i) and the
                  valid_policy_tree includes a node of depth i-1 with
                  the valid_policy anyPolicy, generate a child node with
                  the following values: set the valid_policy to P-OID,
                  set the qualifier_set to P-Q, and set the
                  expected_policy_set to  {P-OID}.

                  For example, consider a valid_policy_tree with a node
                  of depth i-1 where the valid_policy is anyPolicy.
                  Assume the certificate policies Gold and Silver appear
                  in the certificate policies extension of certificate
                  i.  The Gold policy does not have a qualifier, but the
                  Silver policy has the qualifier Q-Silver.  If Gold and
                  Silver were not matched in (i) above, this rule will
                  generate two child nodes of depth i, one for each
                  policy.  The result is shown as Figure 5.

                                   +-----------------+
                                   |    anyPolicy    |
                                   +-----------------+
                                   |       {}        |
                                   +-----------------+ node of depth i-1
                                   |   {anyPolicy}   |
                                   +-----------------+
                                      /           \
                                     /             \
                                    /               \
                                   /                 \
                     +-----------------+          +-----------------+
                     |      Gold       |          |     Silver      |
                     +-----------------+          +-----------------+
                     |       {}        |          |   {Q-Silver}    |
                     +-----------------+ nodes of +-----------------+
                     |     {Gold}      | depth i  |    {Silver}     |
                     +-----------------+          +-----------------+

                  Figure 5.  Processing Unmatched Policies when a
                  Leaf Node Specifies anyPolicy

         (2)  If the certificate policies extension includes the policy
              anyPolicy with the qualifier set AP-Q and either (a)
              inhibit_anyPolicy is greater than 0 or (b) i<n and the
              certificate is self-issued, then:

              For each node in the valid_policy_tree of depth i-1, for
              each value in the expected_policy_set (including
              anyPolicy) that does not appear in a child node, create a
              child node with the following values: set the valid_policy



Cooper, et al.              Standards Track                    [Page 82]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


              to the value from the expected_policy_set in the parent
              node, set the qualifier_set to AP-Q, and set the
              expected_policy_set to the value in the valid_policy from
              this node.

              For example, consider a valid_policy_tree with a node of
              depth i-1 where the expected_policy_set is {Gold, Silver}.
              Assume anyPolicy appears in the certificate policies
              extension of certificate i with no policy qualifiers, but
              Gold and Silver do not appear.  This rule will generate
              two child nodes of depth i, one for each policy.  The
              result is shown below as Figure 6.

                               +-----------------+
                               |      Red        |
                               +-----------------+
                               |       {}        |
                               +-----------------+ node of depth i-1
                               |  {Gold, Silver} |
                               +-----------------+
                                  /           \
                                 /             \
                                /               \
                               /                 \
                 +-----------------+          +-----------------+
                 |      Gold       |          |     Silver      |
                 +-----------------+          +-----------------+
                 |       {}        |          |       {}        |
                 +-----------------+ nodes of +-----------------+
                 |     {Gold}      | depth i  |    {Silver}     |
                 +-----------------+          +-----------------+

              Figure 6.  Processing Unmatched Policies When the
              Certificate Policies Extension Specifies anyPolicy

         (3)  If there is a node in the valid_policy_tree of depth i-1
              or less without any child nodes, delete that node.  Repeat
              this step until there are no nodes of depth i-1 or less
              without children.

              For example, consider the valid_policy_tree shown in
              Figure 7 below.  The two nodes at depth i-1 that are
              marked with an 'X' have no children, and they are deleted.
              Applying this rule to the resulting tree will cause the
              node at depth i-2 that is marked with a 'Y' to be deleted.
              In the resulting tree, there are no nodes of depth i-1 or
              less without children, and this step is complete.




Cooper, et al.              Standards Track                    [Page 83]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (e)  If the certificate policies extension is not present, set the
           valid_policy_tree to NULL.

      (f)  Verify that either explicit_policy is greater than 0 or the
           valid_policy_tree is not equal to NULL;

   If any of steps (a), (b), (c), or (f) fails, the procedure
   terminates, returning a failure indication and an appropriate reason.

   If i is not equal to n, continue by performing the preparatory steps
   listed in Section 15.1.1.2.6.1.4.  If i is equal to n, perform the wrap-up
   steps listed in Section 15.1.1.2.6.1.5.

                                 +-----------+
                                 |           | node of depth i-3
                                 +-----------+
                                 /     |     \
                                /      |      \
                               /       |       \
                   +-----------+ +-----------+ +-----------+
                   |           | |           | |     Y     | nodes of
                   +-----------+ +-----------+ +-----------+ depth i-2
                   /   \               |             |
                  /     \              |             |
                 /       \             |             |
      +-----------+ +-----------+ +-----------+ +-----------+ nodes of
      |           | |     X     | |           | |    X      |  depth
      +-----------+ +-----------+ +-----------+ +-----------+   i-1
            |                      /    |    \
            |                     /     |     \
            |                    /      |      \
      +-----------+ +-----------+ +-----------+ +-----------+ nodes of
      |           | |           | |           | |           |  depth
      +-----------+ +-----------+ +-----------+ +-----------+   i

             Figure 7.  Pruning the valid_policy_tree
```

#### 15.1.1.2.6.1.4. Preparation for Certificate i+1

```text
      To prepare for processing of certificate i+1, perform the
      following steps for certificate i:

      (a)  If a policy mappings extension is present, verify that the
           special value anyPolicy does not appear as an
           issuerDomainPolicy or a subjectDomainPolicy.

      (b)  If a policy mappings extension is present, then for each
           issuerDomainPolicy ID-P in the policy mappings extension:



Cooper, et al.              Standards Track                    [Page 84]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         (1)  If the policy_mapping variable is greater than 0, for each
              node in the valid_policy_tree of depth i where ID-P is the
              valid_policy, set expected_policy_set to the set of
              subjectDomainPolicy values that are specified as
              equivalent to ID-P by the policy mappings extension.

              If no node of depth i in the valid_policy_tree has a
              valid_policy of ID-P but there is a node of depth i with a
              valid_policy of anyPolicy, then generate a child node of
              the node of depth i-1 that has a valid_policy of anyPolicy
              as follows:

            (i)    set the valid_policy to ID-P;

            (ii)   set the qualifier_set to the qualifier set of the
                   policy anyPolicy in the certificate policies
                   extension of certificate i; and

            (iii)  set the expected_policy_set to the set of
                   subjectDomainPolicy values that are specified as
                   equivalent to ID-P by the policy mappings extension.

         (2)  If the policy_mapping variable is equal to 0:

            (i)    delete each node of depth i in the valid_policy_tree
                   where ID-P is the valid_policy.

            (ii)   If there is a node in the valid_policy_tree of depth
                   i-1 or less without any child nodes, delete that
                   node.  Repeat this step until there are no nodes of
                   depth i-1 or less without children.

      (c)  Assign the certificate subject name to working_issuer_name.

      (d)  Assign the certificate subjectPublicKey to
           working_public_key.

      (e)  If the subjectPublicKeyInfo field of the certificate contains
           an algorithm field with non-null parameters, assign the
           parameters to the working_public_key_parameters variable.

           If the subjectPublicKeyInfo field of the certificate contains
           an algorithm field with null parameters or parameters are
           omitted, compare the certificate subjectPublicKey algorithm
           to the working_public_key_algorithm.  If the certificate
           subjectPublicKey algorithm and the
           working_public_key_algorithm are different, set the
           working_public_key_parameters to null.



Cooper, et al.              Standards Track                    [Page 85]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (f)  Assign the certificate subjectPublicKey algorithm to the
           working_public_key_algorithm variable.

      (g)  If a name constraints extension is included in the
           certificate, modify the permitted_subtrees and
           excluded_subtrees state variables as follows:

         (1)  If permittedSubtrees is present in the certificate, set
              the permitted_subtrees state variable to the intersection
              of its previous value and the value indicated in the
              extension field.  If permittedSubtrees does not include a
              particular name type, the permitted_subtrees state
              variable is unchanged for that name type.  For example,
              the intersection of example.com and foo.example.com is
              foo.example.com.  And the intersection of example.com and
              example.net is the empty set.

         (2)  If excludedSubtrees is present in the certificate, set the
              excluded_subtrees state variable to the union of its
              previous value and the value indicated in the extension
              field.  If excludedSubtrees does not include a particular
              name type, the excluded_subtrees state variable is
              unchanged for that name type.  For example, the union of
              the name spaces example.com and foo.example.com is
              example.com.  And the union of example.com and example.net
              is both name spaces.

      (h)  If certificate i is not self-issued:

         (1)  If explicit_policy is not 0, decrement explicit_policy by
              1.

         (2)  If policy_mapping is not 0, decrement policy_mapping by 1.

         (3)  If inhibit_anyPolicy is not 0, decrement inhibit_anyPolicy
              by 1.

      (i)  If a policy constraints extension is included in the
           certificate, modify the explicit_policy and policy_mapping
           state variables as follows:

         (1)  If requireExplicitPolicy is present and is less than
              explicit_policy, set explicit_policy to the value of
              requireExplicitPolicy.

         (2)  If inhibitPolicyMapping is present and is less than
              policy_mapping, set policy_mapping to the value of
              inhibitPolicyMapping.



Cooper, et al.              Standards Track                    [Page 86]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (j)  If the inhibitAnyPolicy extension is included in the
           certificate and is less than inhibit_anyPolicy, set
           inhibit_anyPolicy to the value of inhibitAnyPolicy.

      (k)  If certificate i is a version 3 certificate, verify that the
           basicConstraints extension is present and that cA is set to
           TRUE.  (If certificate i is a version 1 or version 2
           certificate, then the application MUST either verify that
           certificate i is a CA certificate through out-of-band means
           or reject the certificate.  Conforming implementations may
           choose to reject all version 1 and version 2 intermediate
           certificates.)

      (l)  If the certificate was not self-issued, verify that
           max_path_length is greater than zero and decrement
           max_path_length by 1.

      (m)  If pathLenConstraint is present in the certificate and is
           less than max_path_length, set max_path_length to the value
           of pathLenConstraint.

      (n)  If a key usage extension is present, verify that the
           keyCertSign bit is set.

      (o)  Recognize and process any other critical extension present in
           the certificate.  Process any other recognized non-critical
           extension present in the certificate that is relevant to path
           processing.

   If check (a), (k), (l), (n), or (o) fails, the procedure terminates,
   returning a failure indication and an appropriate reason.

   If (a), (k), (l), (n), and (o) have completed successfully, increment
   i and perform the basic certificate processing specified in Section
   15.1.1.2.6.1.3.

15.1.1.2.6.1.5.  Wrap-Up Procedure

   To complete the processing of the target certificate, perform the
   following steps for certificate n:

      (a)  If explicit_policy is not 0, decrement explicit_policy by 1.

      (b)  If a policy constraints extension is included in the
           certificate and requireExplicitPolicy is present and has a
           value of 0, set the explicit_policy state variable to 0.





Cooper, et al.              Standards Track                    [Page 87]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (c)  Assign the certificate subjectPublicKey to
           working_public_key.

      (d)  If the subjectPublicKeyInfo field of the certificate contains
           an algorithm field with non-null parameters, assign the
           parameters to the working_public_key_parameters variable.

           If the subjectPublicKeyInfo field of the certificate contains
           an algorithm field with null parameters or parameters are
           omitted, compare the certificate subjectPublicKey algorithm
           to the working_public_key_algorithm.  If the certificate
           subjectPublicKey algorithm and the
           working_public_key_algorithm are different, set the
           working_public_key_parameters to null.

      (e)  Assign the certificate subjectPublicKey algorithm to the
           working_public_key_algorithm variable.

      (f)  Recognize and process any other critical extension present in
           the certificate n.  Process any other recognized non-critical
           extension present in certificate n that is relevant to path
           processing.

      (g)  Calculate the intersection of the valid_policy_tree and the
           user-initial-policy-set, as follows:

         (i)    If the valid_policy_tree is NULL, the intersection is
                NULL.

         (ii)   If the valid_policy_tree is not NULL and the user-
                initial-policy-set is any-policy, the intersection is
                the entire valid_policy_tree.

         (iii)  If the valid_policy_tree is not NULL and the user-
                initial-policy-set is not any-policy, calculate the
                intersection of the valid_policy_tree and the user-
                initial-policy-set as follows:

             1.  Determine the set of policy nodes whose parent nodes
                 have a valid_policy of anyPolicy.  This is the
                 valid_policy_node_set.

             2.  If the valid_policy of any node in the
                 valid_policy_node_set is not in the user-initial-
                 policy-set and is not anyPolicy, delete this node and
                 all its children.





Cooper, et al.              Standards Track                    [Page 88]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


             3.  If the valid_policy_tree includes a node of depth n
                 with the valid_policy anyPolicy and the user-initial-
                 policy-set is not any-policy, perform the following
                 steps:

               a.  Set P-Q to the qualifier_set in the node of depth n
                   with valid_policy anyPolicy.

               b.  For each P-OID in the user-initial-policy-set that is
                   not the valid_policy of a node in the
                   valid_policy_node_set, create a child node whose
                   parent is the node of depth n-1 with the valid_policy
                   anyPolicy.  Set the values in the child node as
                   follows: set the valid_policy to P-OID, set the
                   qualifier_set to P-Q, and set the expected_policy_set
                   to {P-OID}.

               c.  Delete the node of depth n with the valid_policy
                   anyPolicy.

             4.  If there is a node in the valid_policy_tree of depth
                 n-1 or less without any child nodes, delete that node.
                 Repeat this step until there are no nodes of depth n-1
                 or less without children.

   If either (1) the value of explicit_policy variable is greater than
   zero or (2) the valid_policy_tree is not NULL, then path processing
   has succeeded.

15.1.1.2.6.1.6.  Outputs

   If path processing succeeds, the procedure terminates, returning a
   success indication together with final value of the
   valid_policy_tree, the working_public_key, the
   working_public_key_algorithm, and the working_public_key_parameters.

15.1.1.2.6.2.  Using the Path Validation Algorithm

   The path validation algorithm describes the process of validating a
   single certification path.  While each certification path begins with
   a specific trust anchor, there is no requirement that all
   certification paths validated by a particular system share a single
   trust anchor.  The selection of one or more trusted CAs is a local
   decision.  A system may provide any one of its trusted CAs as the
   trust anchor for a particular path.  The inputs to the path
   validation algorithm may be different for each path.  The inputs used
   to process a path may reflect application-specific requirements or
   limitations in the trust accorded a particular trust anchor.  For



Cooper, et al.              Standards Track                    [Page 89]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   example, a trusted CA may only be trusted for a particular
   certificate policy.  This restriction can be expressed through the
   inputs to the path validation procedure.

   An implementation MAY augment the algorithm presented in Section 15.1.1.2.6.1
   to further limit the set of valid certification paths that begin with
   a particular trust anchor.  For example, an implementation MAY modify
   the algorithm to apply a path length constraint to a specific trust
   anchor during the initialization phase, or the application MAY
   require the presence of a particular alternative name form in the
   target certificate, or the application MAY impose requirements on
   application-specific extensions.  Thus, the path validation algorithm
   presented in Section 15.1.1.2.6.1 defines the minimum conditions for a path to
   be considered valid.

   Where a CA distributes self-signed certificates to specify trust
   anchor information, certificate extensions can be used to specify
   recommended inputs to path validation.  For example, a policy
   constraints extension could be included in the self-signed
   certificate to indicate that paths beginning with this trust anchor
   should be trusted only for the specified policies.  Similarly, a name
   constraints extension could be included to indicate that paths
   beginning with this trust anchor should be trusted only for the
   specified name spaces.  The path validation algorithm presented in
   Section 15.1.1.2.6.1 does not assume that trust anchor information is provided
   in self-signed certificates and does not specify processing rules for
   additional information included in such certificates.
   Implementations that use self-signed certificates to specify trust
   anchor information are free to process or ignore such information.

15.1.1.2.6.3.  CRL Validation

   This section describes the steps necessary to determine if a
   certificate is revoked when CRLs are the revocation mechanism used by
   the certificate issuer.  Conforming implementations that support CRLs
   are not required to implement this algorithm, but they MUST be
   functionally equivalent to the external behavior resulting from this
   procedure when processing CRLs that are issued in conformance with
   this profile.  Any algorithm may be used by a particular
   implementation so long as it derives the correct result.

   This algorithm assumes that all of the needed CRLs are available in a
   local cache.  Further, if the next update time of a CRL has passed,
   the algorithm assumes a mechanism to fetch a current CRL and place it
   in the local CRL cache.






Cooper, et al.              Standards Track                    [Page 90]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   This algorithm defines a set of inputs, a set of state variables, and
   processing steps that are performed for each certificate in the path.
   The algorithm output is the revocation status of the certificate.

15.1.1.2.6.3.1.  Revocation Inputs

   To support revocation processing, the algorithm requires two inputs:

      (a)  certificate:  The algorithm requires the certificate serial
           number and issuer name to determine whether a certificate is
           on a particular CRL.  The basicConstraints extension is used
           to determine whether the supplied certificate is associated
           with a CA or an end entity.  If present, the algorithm uses
           the cRLDistributionPoints and freshestCRL extensions to
           determine revocation status.

      (b)  use-deltas:  This boolean input determines whether delta CRLs
           are applied to CRLs.

15.1.1.2.6.3.2.  Initialization and Revocation State Variables

   To support CRL processing, the algorithm requires the following state
   variables:

      (a)  reasons_mask:  This variable contains the set of revocation
           reasons supported by the CRLs and delta CRLs processed so
           far.  The legal members of the set are the possible
           revocation reason values minus unspecified: keyCompromise,
           cACompromise, affiliationChanged, superseded,
           cessationOfOperation, certificateHold, privilegeWithdrawn,
           and aACompromise.  The special value all-reasons is used to
           denote the set of all legal members.  This variable is
           initialized to the empty set.

      (b)  cert_status:  This variable contains the status of the
           certificate.  This variable may be assigned one of the
           following values: unspecified, keyCompromise, cACompromise,
           affiliationChanged, superseded, cessationOfOperation,
           certificateHold, removeFromCRL, privilegeWithdrawn,
           aACompromise, the special value UNREVOKED, or the special
           value UNDETERMINED.  This variable is initialized to the
           special value UNREVOKED.

      (c)  interim_reasons_mask:  This contains the set of revocation
           reasons supported by the CRL or delta CRL currently being
           processed.





Cooper, et al.              Standards Track                    [Page 91]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Note: In some environments, it is not necessary to check all reason
   codes.  For example, some environments are only concerned with
   cACompromise and keyCompromise for CA certificates.  This algorithm
   checks all reason codes.  Additional processing and state variables
   may be necessary to limit the checking to a subset of the reason
   codes.

15.1.1.2.6.3.3.  CRL Processing

   This algorithm begins by assuming that the certificate is not
   revoked.  The algorithm checks one or more CRLs until either the
   certificate status is determined to be revoked or sufficient CRLs
   have been checked to cover all reason codes.

   For each distribution point (DP) in the certificate's CRL
   distribution points extension, for each corresponding CRL in the
   local CRL cache, while ((reasons_mask is not all-reasons) and
   (cert_status is UNREVOKED)) perform the following:

      (a)  Update the local CRL cache by obtaining a complete CRL, a
           delta CRL, or both, as required:

         (1)  If the current time is after the value of the CRL next
              update field, then do one of the following:

            (i)   If use-deltas is set and either the certificate or the
                  CRL contains the freshest CRL extension, obtain a
                  delta CRL with a next update value that is after the
                  current time and can be used to update the locally
                  cached CRL as specified in Section 15.1.1.2.5.2.4.

            (ii)  Update the local CRL cache with a current complete
                  CRL, verify that the current time is before the next
                  update value in the new CRL, and continue processing
                  with the new CRL.  If use-deltas is set and either the
                  certificate or the CRL contains the freshest CRL
                  extension, then obtain the current delta CRL that can
                  be used to update the new locally cached complete CRL
                  as specified in Section 15.1.1.2.5.2.4.

         (2)  If the current time is before the value of the next update
              field, use-deltas is set, and either the certificate or
              the CRL contains the freshest CRL extension, then obtain
              the current delta CRL that can be used to update the
              locally cached complete CRL as specified in Section 15.1.1.2.5.2.4.






Cooper, et al.              Standards Track                    [Page 92]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (b)  Verify the issuer and scope of the complete CRL as follows:

         (1)  If the DP includes cRLIssuer, then verify that the issuer
              field in the complete CRL matches cRLIssuer in the DP and
              that the complete CRL contains an issuing distribution
              point extension with the indirectCRL boolean asserted.
              Otherwise, verify that the CRL issuer matches the
              certificate issuer.

         (2)  If the complete CRL includes an issuing distribution point
              (IDP) CRL extension, check the following:

            (i)   If the distribution point name is present in the IDP
                  CRL extension and the distribution field is present in
                  the DP, then verify that one of the names in the IDP
                  matches one of the names in the DP.  If the
                  distribution point name is present in the IDP CRL
                  extension and the distribution field is omitted from
                  the DP, then verify that one of the names in the IDP
                  matches one of the names in the cRLIssuer field of the
                  DP.

            (ii)  If the onlyContainsUserCerts boolean is asserted in
                  the IDP CRL extension, verify that the certificate
                  does not include the basic constraints extension with
                  the cA boolean asserted.

            (iii) If the onlyContainsCACerts boolean is asserted in the
                  IDP CRL extension, verify that the certificate
                  includes the basic constraints extension with the cA
                  boolean asserted.

            (iv)  Verify that the onlyContainsAttributeCerts boolean is
                  not asserted.

      (c)  If use-deltas is set, verify the issuer and scope of the
           delta CRL as follows:

         (1)  Verify that the delta CRL issuer matches the complete CRL
              issuer.

         (2)  If the complete CRL includes an issuing distribution point
              (IDP) CRL extension, verify that the delta CRL contains a
              matching IDP CRL extension.  If the complete CRL omits an
              IDP CRL extension, verify that the delta CRL also omits an
              IDP CRL extension.





Cooper, et al.              Standards Track                    [Page 93]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         (3)  Verify that the delta CRL authority key identifier
              extension matches the complete CRL authority key
              identifier extension.

      (d)  Compute the interim_reasons_mask for this CRL as follows:

         (1)  If the issuing distribution point (IDP) CRL extension is
              present and includes onlySomeReasons and the DP includes
              reasons, then set interim_reasons_mask to the intersection
              of reasons in the DP and onlySomeReasons in the IDP CRL
              extension.

         (2)  If the IDP CRL extension includes onlySomeReasons but the
              DP omits reasons, then set interim_reasons_mask to the
              value of onlySomeReasons in the IDP CRL extension.

         (3)  If the IDP CRL extension is not present or omits
              onlySomeReasons but the DP includes reasons, then set
              interim_reasons_mask to the value of DP reasons.

         (4)  If the IDP CRL extension is not present or omits
              onlySomeReasons and the DP omits reasons, then set
              interim_reasons_mask to the special value all-reasons.

      (e)  Verify that interim_reasons_mask includes one or more reasons
           that are not included in the reasons_mask.

      (f)  Obtain and validate the certification path for the issuer of
           the complete CRL.  The trust anchor for the certification
           path MUST be the same as the trust anchor used to validate
           the target certificate.  If a key usage extension is present
           in the CRL issuer's certificate, verify that the cRLSign bit
           is set.

      (g)  Validate the signature on the complete CRL using the public
           key validated in step (f).

      (h)  If use-deltas is set, then validate the signature on the
           delta CRL using the public key validated in step (f).

      (i)  If use-deltas is set, then search for the certificate on the
           delta CRL.  If an entry is found that matches the certificate
           issuer and serial number as described in Section 15.1.1.2.5.3.3, then
           set the cert_status variable to the indicated reason as
           follows:






Cooper, et al.              Standards Track                    [Page 94]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         (1)  If the reason code CRL entry extension is present, set the
              cert_status variable to the value of the reason code CRL
              entry extension.

         (2)  If the reason code CRL entry extension is not present, set
              the cert_status variable to the value unspecified.

      (j)  If (cert_status is UNREVOKED), then search for the
           certificate on the complete CRL.  If an entry is found that
           matches the certificate issuer and serial number as described
           in Section 15.1.1.2.5.3.3, then set the cert_status variable to the
           indicated reason as described in step (i).

      (k)  If (cert_status is removeFromCRL), then set cert_status to
           UNREVOKED.

      (l)  Set the reasons_mask state variable to the union of its
           previous value and the value of the interim_reasons_mask
           state variable.

   If ((reasons_mask is all-reasons) OR (cert_status is not UNREVOKED)),
   then the revocation status has been determined, so return
   cert_status.

   If the revocation status has not been determined, repeat the process
   above with any available CRLs not specified in a distribution point
   but issued by the certificate issuer.  For the processing of such a
   CRL, assume a DP with both the reasons and the cRLIssuer fields
   omitted and a distribution point name of the certificate issuer.
   That is, the sequence of names in fullName is generated from the
   certificate issuer field as well as the certificate issuerAltName
   extension.  After processing such CRLs, if the revocation status has
   still not been determined, then return the cert_status UNDETERMINED.

15.1.1.2.7.  Processing Rules for Internationalized Names

   Internationalized names may be encountered in numerous certificate
   and CRL fields and extensions, including distinguished names,
   internationalized domain names, electronic mail addresses, and
   Internationalized Resource Identifiers (IRIs).  Storage, comparison,
   and presentation of such names require special care.  Some characters
   may be encoded in multiple ways.  The same names could be represented
   in multiple encodings (e.g., ASCII or UTF8).  This section
   establishes conformance requirements for storage or comparison of
   each of these name forms.  Informative guidance on presentation is
   provided for some of these name forms.





Cooper, et al.              Standards Track                    [Page 95]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


15.1.1.2.7.1.  Internationalized Names in Distinguished Names

   Representation of internationalized names in distinguished names is
   covered in Sections 15.1.1.2.4.1.2.4, Issuer Name, and 15.1.1.2.4.1.2.6, Subject Name.
   Standard naming attributes, such as common name, employ the
   DirectoryString type, which supports internationalized names through
   a variety of language encodings.  Conforming implementations MUST
   support UTF8String and PrintableString.  RFC 3280 required only
   binary comparison of attribute values encoded in UTF8String, however,
   this specification requires a more comprehensive handling of
   comparison.  Implementations may encounter certificates and CRLs with
   names encoded using TeletexString, BMPString, or UniversalString, but
   support for these is OPTIONAL.

   Conforming implementations MUST use the LDAP StringPrep profile
   (including insignificant space handling), as specified in [RFC4518],
   as the basis for comparison of distinguished name attributes encoded
   in either PrintableString or UTF8String.  Conforming implementations
   MUST support name comparisons using caseIgnoreMatch.  Support for
   attribute types that use other equality matching rules is optional.

   Before comparing names using the caseIgnoreMatch matching rule,
   conforming implementations MUST perform the six-step string
   preparation algorithm described in [RFC4518] for each attribute of
   type DirectoryString, with the following clarifications:

      *  In step 2, Map, the mapping shall include case folding as
         specified in Appendix B.2 of [RFC3454].

      *  In step 6, Insignificant Character Removal, perform white space
         compression as specified in Section 15.1.1.2.2.6.1, Insignificant Space
         Handling, of [RFC4518].

   When performing the string preparation algorithm, attributes MUST be
   treated as stored values.

   Comparisons of domainComponent attributes MUST be performed as
   specified in Section 15.1.1.2.7.3.

   Two naming attributes match if the attribute types are the same and
   the values of the attributes are an exact match after processing with
   the string preparation algorithm.  Two relative distinguished names
   RDN1 and RDN2 match if they have the same number of naming attributes
   and for each naming attribute in RDN1 there is a matching naming
   attribute in RDN2.  Two distinguished names DN1 and DN2 match if they
   have the same number of RDNs, for each RDN in DN1 there is a matching
   RDN in DN2, and the matching RDNs appear in the same order in both
   DNs.  A distinguished name DN1 is within the subtree defined by the



Cooper, et al.              Standards Track                    [Page 96]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   distinguished name DN2 if DN1 contains at least as many RDNs as DN2,
   and DN1 and DN2 are a match when trailing RDNs in DN1 are ignored.

15.1.1.2.7.2.  Internationalized Domain Names in GeneralName

   Internationalized Domain Names (IDNs) may be included in certificates
   and CRLs in the subjectAltName and issuerAltName extensions, name
   constraints extension, authority information access extension,
   subject information access extension, CRL distribution points
   extension, and issuing distribution point extension.  Each of these
   extensions uses the GeneralName type; one choice in GeneralName is
   the dNSName field, which is defined as type IA5String.

   IA5String is limited to the set of ASCII characters.  To accommodate
   internationalized domain names in the current structure, conforming
   implementations MUST convert internationalized domain names to the
   ASCII Compatible Encoding (ACE) format as specified in Section 4 of
   RFC 3490 before storage in the dNSName field.  Specifically,
   conforming implementations MUST perform the conversion operation
   specified in Section 4 of RFC 3490, with the following
   clarifications:

      *  in step 1, the domain name SHALL be considered a "stored
         string".  That is, the AllowUnassigned flag SHALL NOT be set;

      *  in step 3, set the flag called "UseSTD3ASCIIRules";

      *  in step 4, process each label with the "ToASCII" operation; and

      *  in step 5, change all label separators to U+002E (full stop).

   When comparing DNS names for equality, conforming implementations
   MUST perform a case-insensitive exact match on the entire DNS name.
   When evaluating name constraints, conforming implementations MUST
   perform a case-insensitive exact match on a label-by-label basis.  As
   noted in Section 15.1.1.2.4.2.1.10, any DNS name that may be constructed by
   adding labels to the left-hand side of the domain name given as the
   constraint is considered to fall within the indicated subtree.

   Implementations should convert IDNs to Unicode before display.
   Specifically, conforming implementations should perform the
   conversion operation specified in Section 4 of RFC 3490, with the
   following clarifications:

      *  in step 1, the domain name SHALL be considered a "stored
         string".  That is, the AllowUnassigned flag SHALL NOT be set;

      *  in step 3, set the flag called "UseSTD3ASCIIRules";



Cooper, et al.              Standards Track                    [Page 97]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      *  in step 4, process each label with the "ToUnicode" operation;
         and

      *  skip step 5.

   Note:  Implementations MUST allow for increased space requirements
   for IDNs.  An IDN ACE label will begin with the four additional
   characters "xn--" and may require as many as five ASCII characters to
   specify a single international character.

15.1.1.2.7.3.  Internationalized Domain Names in Distinguished Names

   Domain Names may also be represented as distinguished names using
   domain components in the subject field, the issuer field, the
   subjectAltName extension, or the issuerAltName extension.  As with
   the dNSName in the GeneralName type, the value of this attribute is
   defined as an IA5String.  Each domainComponent attribute represents a
   single label.  To represent a label from an IDN in the distinguished
   name, the implementation MUST perform the "ToASCII" label conversion
   specified in Section 15.1.1.2.4.1 of RFC 3490.  The label SHALL be considered
   a "stored string".  That is, the AllowUnassigned flag SHALL NOT be
   set.

   Conforming implementations shall perform a case-insensitive exact
   match when comparing domainComponent attributes in distinguished
   names, as described in Section 15.1.1.2.7.2.

   Implementations should convert ACE labels to Unicode before display.
   Specifically, conforming implementations should perform the
   "ToUnicode" conversion operation specified, as described in Section
   15.1.1.2.7.2, on each ACE label before displaying the name.

15.1.1.2.7.4.  Internationalized Resource Identifiers

   Internationalized Resource Identifiers (IRIs) are the
   internationalized complement to the Uniform Resource Identifier
   (URI).  IRIs are sequences of characters from Unicode, while URIs are
   sequences of characters from the ASCII character set.  [RFC3987]
   defines a mapping from IRIs to URIs.  While IRIs are not encoded
   directly in any certificate fields or extensions, their mapped URIs
   may be included in certificates and CRLs.  URIs may appear in the
   subjectAltName and issuerAltName extensions, name constraints
   extension, authority information access extension, subject
   information access extension, issuing distribution point extension,
   and CRL distribution points extension.  Each of these extensions uses
   the GeneralName type; URIs are encoded in the
   uniformResourceIdentifier field in GeneralName, which is defined as
   type IA5String.



Cooper, et al.              Standards Track                    [Page 98]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   To accommodate IRIs in the current structure, conforming
   implementations MUST map IRIs to URIs as specified in Section 15.1.1.2.3.1 of
   [RFC3987], with the following clarifications:

      *  in step 1, generate a UCS character sequence from the original
         IRI format normalizing according to the NFC as specified in
         Variant b (normalization according to NFC);

      *  perform step 2 using the output from step 1.

   Implementations MUST NOT convert the ireg-name component before
   performing step 2.

   Before URIs may be compared, conforming implementations MUST perform
   a combination of the syntax-based and scheme-based normalization
   techniques described in [RFC3987].  Specifically, conforming
   implementations MUST prepare URIs for comparison as follows:

      *  Step 1: Where IRIs allow the usage of IDNs, those names MUST be
         converted to ASCII Compatible Encoding as specified in Section
         7.2 above.

      *  Step 2: The scheme and host are normalized to lowercase, as
         described in Section 5.3.2.1 of [RFC3987].

      *  Step 3: Perform percent-encoding normalization, as specified in
         Section 15.1.1.2.5.3.2.3 of [RFC3987].

      *  Step 4: Perform path segment normalization, as specified in
         Section 15.1.1.2.5.3.2.4 of [RFC3987].

      *  Step 5: If recognized, the implementation MUST perform scheme-
         based normalization as specified in Section 15.1.1.2.5.3.3 of [RFC3987].

   Conforming implementations MUST recognize and perform scheme-based
   normalization for the following schemes: ldap, http, https, and ftp.
   If the scheme is not recognized, step 5 is omitted.

   When comparing URIs for equivalence, conforming implementations shall
   perform a case-sensitive exact match.

   Implementations should convert URIs to Unicode before display.
   Specifically, conforming implementations should perform the
   conversion operation specified in Section 15.1.1.2.3.2 of [RFC3987].







Cooper, et al.              Standards Track                    [Page 99]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


15.1.1.2.7.5.  Internationalized Electronic Mail Addresses

   Electronic Mail addresses may be included in certificates and CRLs in
   the subjectAltName and issuerAltName extensions, name constraints
   extension, authority information access extension, subject
   information access extension, issuing distribution point extension,
   or CRL distribution points extension.  Each of these extensions uses
   the GeneralName construct; GeneralName includes the rfc822Name
   choice, which is defined as type IA5String.  To accommodate email
   addresses with internationalized domain names using the current
   structure, conforming implementations MUST convert the addresses into
   an ASCII representation.

   Where the host-part (the Domain of the Mailbox) contains an
   internationalized name, the domain name MUST be converted from an IDN
   to the ASCII Compatible Encoding (ACE) format as specified in Section
   15.1.1.2.7.2.

   Two email addresses are considered to match if:

      1)  the local-part of each name is an exact match, AND

      2)  the host-part of each name matches using a case-insensitive
          ASCII comparison.

   Implementations should convert the host-part of internationalized
   email addresses specified in these extensions to Unicode before
   display.  Specifically, conforming implementations should perform the
   conversion of the host-part of the Mailbox as described in Section
   15.1.1.2.7.2.

15.1.1.2.8.  Security Considerations

   The majority of this specification is devoted to the format and
   content of certificates and CRLs.  Since certificates and CRLs are
   digitally signed, no additional integrity service is necessary.
   Neither certificates nor CRLs need be kept secret, and unrestricted
   and anonymous access to certificates and CRLs has no security
   implications.

   However, security factors outside the scope of this specification
   will affect the assurance provided to certificate users.  This
   section highlights critical issues to be considered by implementers,
   administrators, and users.

   The procedures performed by CAs and RAs to validate the binding of
   the subject's identity to their public key greatly affect the
   assurance that ought to be placed in the certificate.  Relying



Cooper, et al.              Standards Track                   [Page 100]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   parties might wish to review the CA's certification practice
   statement.  This is particularly important when issuing certificates
   to other CAs.

   The use of a single key pair for both signature and other purposes is
   strongly discouraged.  Use of separate key pairs for signature and
   key management provides several benefits to the users.  The
   ramifications associated with loss or disclosure of a signature key
   are different from loss or disclosure of a key management key.  Using
   separate key pairs permits a balanced and flexible response.
   Similarly, different validity periods or key lengths for each key
   pair may be appropriate in some application environments.
   Unfortunately, some legacy applications (e.g., Secure Sockets Layer
   (SSL)) use a single key pair for signature and key management.

   The protection afforded private keys is a critical security factor.
   On a small scale, failure of users to protect their private keys will
   permit an attacker to masquerade as them or decrypt their personal
   information.  On a larger scale, compromise of a CA's private signing
   key may have a catastrophic effect.  If an attacker obtains the
   private key unnoticed, the attacker may issue bogus certificates and
   CRLs.  Existence of bogus certificates and CRLs will undermine
   confidence in the system.  If such a compromise is detected, all
   certificates issued to the compromised CA MUST be revoked, preventing
   services between its users and users of other CAs.  Rebuilding after
   such a compromise will be problematic, so CAs are advised to
   implement a combination of strong technical measures (e.g., tamper-
   resistant cryptographic modules) and appropriate management
   procedures (e.g., separation of duties) to avoid such an incident.

   Loss of a CA's private signing key may also be problematic.  The CA
   would not be able to produce CRLs or perform normal key rollover.
   CAs SHOULD maintain secure backup for signing keys.  The security of
   the key backup procedures is a critical factor in avoiding key
   compromise.

   The availability and freshness of revocation information affects the
   degree of assurance that ought to be placed in a certificate.  While
   certificates expire naturally, events may occur during its natural
   lifetime that negate the binding between the subject and public key.
   If revocation information is untimely or unavailable, the assurance
   associated with the binding is clearly reduced.  Relying parties
   might not be able to process every critical extension that can appear
   in a CRL.  CAs SHOULD take extra care when making revocation
   information available only through CRLs that contain critical
   extensions, particularly if support for those extensions is not
   mandated by this profile.  For example, if revocation information is
   supplied using a combination of delta CRLs and full CRLs, and the



Cooper, et al.              Standards Track                   [Page 101]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   delta CRLs are issued more frequently than the full CRLs, then
   relying parties that cannot handle the critical extensions related to
   delta CRL processing will not be able to obtain the most recent
   revocation information.  Alternatively, if a full CRL is issued
   whenever a delta CRL is issued, then timely revocation information
   will be available to all relying parties.  Similarly, implementations
   of the certification path validation mechanism described in Section 6
   that omit revocation checking provide less assurance than those that
   support it.

   The certification path validation algorithm depends on the certain
   knowledge of the public keys (and other information) about one or
   more trusted CAs.  The decision to trust a CA is an important
   decision as it ultimately determines the trust afforded a
   certificate.  The authenticated distribution of trusted CA public
   keys (usually in the form of a "self-signed" certificate) is a
   security critical out-of-band process that is beyond the scope of
   this specification.

   In addition, where a key compromise or CA failure occurs for a
   trusted CA, the user will need to modify the information provided to
   the path validation routine.  Selection of too many trusted CAs makes
   the trusted CA information difficult to maintain.  On the other hand,
   selection of only one trusted CA could limit users to a closed
   community of users.

   The quality of implementations that process certificates also affects
   the degree of assurance provided.  The path validation algorithm
   described in Section 6 relies upon the integrity of the trusted CA
   information, and especially the integrity of the public keys
   associated with the trusted CAs.  By substituting public keys for
   which an attacker has the private key, an attacker could trick the
   user into accepting false certificates.

   The binding between a key and certificate subject cannot be stronger
   than the cryptographic module implementation and algorithms used to
   generate the signature.  Short key lengths or weak hash algorithms
   will limit the utility of a certificate.  CAs are encouraged to note
   advances in cryptology so they can employ strong cryptographic
   techniques.  In addition, CAs SHOULD decline to issue certificates to
   CAs or end entities that generate weak signatures.

   Inconsistent application of name comparison rules can result in
   acceptance of invalid X.509 certification paths or rejection of valid
   ones.  The X.500 series of specifications defines rules for comparing
   distinguished names that require comparison of strings without regard





Cooper, et al.              Standards Track                   [Page 102]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   to case, character set, multi-character white space substring, or
   leading and trailing white space.  This specification relaxes these
   requirements, requiring support for binary comparison at a minimum.

   CAs MUST encode the distinguished name in the subject field of a CA
   certificate identically to the distinguished name in the issuer field
   in certificates issued by that CA.  If CAs use different encodings,
   implementations might fail to recognize name chains for paths that
   include this certificate.  As a consequence, valid paths could be
   rejected.

   In addition, name constraints for distinguished names MUST be stated
   identically to the encoding used in the subject field or
   subjectAltName extension.  If not, then name constraints stated as
   excludedSubtrees will not match and invalid paths will be accepted
   and name constraints expressed as permittedSubtrees will not match
   and valid paths will be rejected.  To avoid acceptance of invalid
   paths, CAs SHOULD state name constraints for distinguished names as
   permittedSubtrees wherever possible.

   In general, using the nameConstraints extension to constrain one name
   form (e.g., DNS names) offers no protection against use of other name
   forms (e.g., electronic mail addresses).

   While X.509 mandates that names be unambiguous, there is a risk that
   two unrelated authorities will issue certificates and/or CRLs under
   the same issuer name.  As a means of reducing problems and security
   issues related to issuer name collisions, CA and CRL issuer names
   SHOULD be formed in a way that reduces the likelihood of name
   collisions.  Implementers should take into account the possible
   existence of multiple unrelated CAs and CRL issuers with the same
   name.  At a minimum, implementations validating CRLs MUST ensure that
   the certification path of a certificate and the CRL issuer
   certification path used to validate the certificate terminate at the
   same trust anchor.

   While the local-part of an electronic mail address is case sensitive
   [RFC2821], emailAddress attribute values are not case sensitive
   [RFC2985].  As a result, there is a risk that two different email
   addresses will be treated as the same address when the matching rule
   for the emailAddress attribute is used, if the email server exploits
   the case sensitivity of mailbox local-parts.  Implementers should not
   include an email address in the emailAddress attribute if the email
   server that hosts the email address treats the local-part of email
   addresses as case sensitive.

   Implementers should be aware of risks involved if the CRL
   distribution points or authority information access extensions of



Cooper, et al.              Standards Track                   [Page 103]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   corrupted certificates or CRLs contain links to malicious code.
   Implementers should always take the steps of validating the retrieved
   data to ensure that the data is properly formed.

   When certificates include a cRLDistributionPoints extension with an
   https URI or similar scheme, circular dependencies can be introduced.
   The relying party is forced to perform an additional path validation
   in order to obtain the CRL required to complete the initial path
   validation!  Circular conditions can also be created with an https
   URI (or similar scheme) in the authorityInfoAccess or
   subjectInfoAccess extensions.  At worst, this situation can create
   unresolvable dependencies.

   CAs SHOULD NOT include URIs that specify https, ldaps, or similar
   schemes in extensions.  CAs that include an https URI in one of these
   extensions MUST ensure that the server's certificate can be validated
   without using the information that is pointed to by the URI.  Relying
   parties that choose to validate the server's certificate when
   obtaining information pointed to by an https URI in the
   cRLDistributionPoints, authorityInfoAccess, or subjectInfoAccess
   extensions MUST be prepared for the possibility that this will result
   in unbounded recursion.

   Self-issued certificates provide CAs with one automated mechanism to
   indicate changes in the CA's operations.  In particular, self-issued
   certificates may be used to implement a graceful change-over from one
   non-compromised CA key pair to the next.  Detailed procedures for "CA
   key update" are specified in [RFC4210], where the CA protects its new
   public key using its previous private key and vice versa using two
   self-issued certificates.  Conforming client implementations will
   process the self-issued certificate and determine whether
   certificates issued under the new key may be trusted.  Self-issued
   certificates MAY be used to support other changes in CA operations,
   such as additions to the CA's policy set, using similar procedures.

   Some legacy implementations support names encoded in the ISO 8859-1
   character set (Latin1String) [ISO8859] but tag them as TeletexString.
   TeletexString encodes a larger character set than ISO 8859-1, but it
   encodes some characters differently.  The name comparison rules
   specified in Section 15.1.1.2.7.1 assume that TeletexStrings are encoded as
   described in the ASN.1 standard.  When comparing names encoded using
   the Latin1String character set, false positives and negatives are
   possible.

   When strings are mapped from internal representations to visual
   representations, sometimes two different strings will have the same
   or similar visual representations.  This can happen for many
   different reasons, including use of similar glyphs and use of



Cooper, et al.              Standards Track                   [Page 104]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   composed characters (such as e + ' equaling U+00E9, the Korean
   composed characters, and vowels above consonant clusters in certain
   languages).  As a result of this situation, people doing visual
   comparisons between two different names may think they are the same
   when in fact they are not.  Also, people may mistake one string for
   another.  Issuers of certificates and relying parties both need to be
   aware of this situation.

15.1.1.2.9.  IANA Considerations

   Extensions in certificates and CRLs are identified using object
   identifiers.  The objects are defined in an arc delegated by IANA to
   the PKIX Working Group.  No further action by IANA is necessary for
   this document or any anticipated updates.

15.1.1.2.10.  Acknowledgments

   Warwick Ford participated with the authors in some of the design team
   meetings that directed development of this document.  The design
   team's efforts were guided by contributions from Matt Crawford, Tom
   Gindin, Steve Hanna, Stephen Henson, Paul Hoffman, Takashi Ito, Denis
   Pinkas, and Wen-Cheng Wang.

15.1.1.2.11.  References

15.1.1.2.11.1.  Normative References

   [RFC791]   Postel, J., "Internet Protocol", STD 5, RFC 791, September
              1981.

   [RFC1034]  Mockapetris, P., "Domain Names - Concepts and Facilities",
              STD 13, RFC 1034, November 1987.

   [RFC1123]  Braden, R., Ed., "Requirements for Internet Hosts --
              Application and Support", STD 3, RFC 1123, October 1989.

   [RFC2119]  Bradner, S., "Key words for use in RFCs to Indicate
              Requirement Levels", BCP 14, RFC 2119, March 1997.

   [RFC2460]  Deering, S. and R. Hinden, "Internet Protocol, Version 6
              (IPv6) Specification", RFC 2460, December 1998.

   [RFC2585]  Housley, R. and P. Hoffman, "Internet X.509 Public Key
              Infrastructure: Operational Protocols: FTP and HTTP", RFC
              2585, May 1999.






Cooper, et al.              Standards Track                   [Page 105]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   [RFC2616]  Fielding, R., Gettys, J., Mogul, J., Frystyk, H.,
              Masinter, L., Leach, P., and T. Berners-Lee, "Hypertext
              Transfer Protocol -- HTTP/1.1", RFC 2616, June 1999.

   [RFC2797]  Myers, M., Liu, X., Schaad, J., and J. Weinstein,
              "Certificate Management Messages over CMS", RFC 2797,
              April 2000.

   [RFC2821]  Klensin, J., Ed., "Simple Mail Transfer Protocol", RFC
              2821, April 2001.

   [RFC3454]  Hoffman, P. and M. Blanchet, "Preparation of
              Internationalized Strings ("stringprep")", RFC 3454,
              December 2002.

   [RFC3490]  Faltstrom, P., Hoffman, P., and A. Costello,
              "Internationalizing Domain Names in Applications (IDNA)",
              RFC 3490, March 2003.

   [RFC3629]  Yergeau, F., "UTF-8, a transformation format of ISO
              10646", STD 63, RFC 3629, November 2003.

   [RFC3986]  Berners-Lee, T., Fielding, R., and L. Masinter, "Uniform
              Resource Identifier (URI): Generic Syntax", STD 66, RFC
              3986, January 2005.

   [RFC3987]  Duerst, M. and M. Suignard, "Internationalized Resource
              Identifiers (IRIs)", RFC 3987, January 2005.

   [RFC4516]  Smith, M., Ed., and T. Howes, "Lightweight Directory
              Access Protocol (LDAP): Uniform Resource Locator", RFC
              4516, June 2006.

   [RFC4518]  Zeilenga, K., "Lightweight Directory Access Protocol
              (LDAP): Internationalized String Preparation", RFC 4518,
              June 2006.

   [RFC4523]  Zeilenga, K., "Lightweight Directory Access Protocol
              (LDAP) Schema Definitions for X.509 Certificates", RFC
              4523, June 2006.

   [RFC4632]  Fuller, V. and T. Li, "Classless Inter-domain Routing
              (CIDR): The Internet Address Assignment and Aggregation
              Plan", BCP 122, RFC 4632, August 2006.

   [X.680]    ITU-T Recommendation X.680 (2002) | ISO/IEC 8824-1:2002,
              Information technology - Abstract Syntax Notation One
              (ASN.1):  Specification of basic notation.



Cooper, et al.              Standards Track                   [Page 106]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   [X.690]    ITU-T Recommendation X.690 (2002) | ISO/IEC 8825-1:2002,
              Information technology - ASN.1 encoding rules:
              Specification of Basic Encoding Rules (BER), Canonical
              Encoding Rules (CER) and Distinguished Encoding Rules
              (DER).

11.2.  Informative References

   [ISO8859]  ISO/IEC 8859-1:1998.  Information technology -- 8-bit
              single-byte coded graphic character sets -- Part 1: Latin
              alphabet No. 1.

   [ISO10646] ISO/IEC 10646:2003.  Information technology -- Universal
              Multiple-Octet Coded Character Set (UCS).

   [NFC]      Davis, M. and M. Duerst, "Unicode Standard Annex #15:
              Unicode Normalization Forms", October 2006,
              <http://www.unicode.org/reports/tr15/>.

   [RFC1422]  Kent, S., "Privacy Enhancement for Internet Electronic
              Mail: Part II: Certificate-Based Key Management", RFC
              1422, February 1993.

   [RFC2277]  Alvestrand, H., "IETF Policy on Character Sets and
              Languages", BCP 18, RFC 2277, January 1998.

   [RFC2459]  Housley, R., Ford, W., Polk, W., and D. Solo, "Internet
              X.509 Public Key Infrastructure Certificate and CRL
              Profile", RFC 2459, January 1999.

   [RFC2560]  Myers, M., Ankney, R., Malpani, A., Galperin, S., and C.
              Adams, "X.509 Internet Public Key Infrastructure Online
              Certificate Status Protocol - OCSP", RFC 2560, June 1999.

   [RFC2985]  Nystrom, M. and B. Kaliski, "PKCS #9: Selected Object
              Classes and Attribute Types Version 2.0", RFC 2985,
              November 2000.

   [RFC3161]  Adams, C., Cain, P., Pinkas, D., and R. Zuccherato,
              "Internet X.509 Public Key Infrastructure Time-Stamp
              Protocol (TSP)", RFC 3161, August 2001.

   [RFC3279]  Bassham, L., Polk, W., and R. Housley, "Algorithms and
              Identifiers for the Internet X.509 Public Key
              Infrastructure Certificate and Certificate Revocation List
              (CRL) Profile", RFC 3279, April 2002.





Cooper, et al.              Standards Track                   [Page 107]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   [RFC3280]  Housley, R., Polk, W., Ford, W., and D. Solo, "Internet
              X.509 Public Key Infrastructure Certificate and
              Certificate Revocation List (CRL) Profile", RFC 3280,
              April 2002.

   [RFC4055]  Schaad, J., Kaliski, B., and R. Housley, "Additional
              Algorithms and Identifiers for RSA Cryptography for use in
              the Internet X.509 Public Key Infrastructure Certificate
              and Certificate Revocation List (CRL) Profile", RFC 4055,
              June 2005.

   [RFC4120]  Neuman, C., Yu, T., Hartman, S., and K. Raeburn, "The
              Kerberos Network Authentication Service (V5)", RFC 4120,
              July 2005.

   [RFC4210]  Adams, C., Farrell, S., Kause, T., and T. Mononen,
              "Internet X.509 Public Key Infrastructure Certificate
              Management Protocol (CMP)", RFC 4210, September 2005.

   [RFC4325]  Santesson, S. and R. Housley, "Internet X.509 Public Key
              Infrastructure Authority Information Access Certificate
              Revocation List (CRL) Extension", RFC 4325, December 2005.

   [RFC4491]  Leontiev, S., Ed., and D. Shefanovski, Ed., "Using the
              GOST R 34.10-94, GOST R 34.10-2001, and GOST R 34.11-94
              Algorithms with the Internet X.509 Public Key
              Infrastructure Certificate and CRL Profile", RFC 4491, May
              2006.

   [RFC4510]  Zeilenga, K., Ed., "Lightweight Directory Access Protocol
              (LDAP): Technical Specification Road Map", RFC 4510, June
              2006.

   [RFC4512]  Zeilenga, K., Ed., "Lightweight Directory Access Protocol
              (LDAP): Directory Information Models", RFC 4512, June
              2006.

   [RFC4514]  Zeilenga, K., Ed., "Lightweight Directory Access Protocol
              (LDAP): String Representation of Distinguished Names", RFC
              4514, June 2006.

   [RFC4519]  Sciberras, A., Ed., "Lightweight Directory Access Protocol
              (LDAP): Schema for User Applications", RFC 4519, June
              2006.







Cooper, et al.              Standards Track                   [Page 108]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   [RFC4630]  Housley, R. and S. Santesson, "Update to DirectoryString
              Processing in the Internet X.509 Public Key Infrastructure
              Certificate and Certificate Revocation List (CRL)
              Profile", RFC 4630, August 2006.

   [X.500]    ITU-T Recommendation X.500 (2005) | ISO/IEC 9594-1:2005,
              Information technology - Open Systems Interconnection -
              The Directory: Overview of concepts, models and services.

   [X.501]    ITU-T Recommendation X.501 (2005) | ISO/IEC 9594-2:2005,
              Information technology - Open Systems Interconnection -
              The Directory: Models.

   [X.509]    ITU-T Recommendation X.509 (2005) | ISO/IEC 9594-8:2005,
              Information technology - Open Systems Interconnection -
              The Directory: Public-key and attribute certificate
              frameworks.

   [X.520]    ITU-T Recommendation X.520 (2005) | ISO/IEC 9594-6:2005,
              Information technology - Open Systems Interconnection -
              The Directory: Selected attribute types.

   [X.660]    ITU-T Recommendation X.660 (2004) | ISO/IEC 9834-1:2005,
              Information technology - Open Systems Interconnection -
              Procedures for the operation of OSI Registration
              Authorities: General procedures, and top arcs of the ASN.1
              Object Identifier tree.

   [X.683]    ITU-T Recommendation X.683 (2002) | ISO/IEC 8824-4:2002,
              Information technology - Abstract Syntax Notation One
              (ASN.1): Parameterization of ASN.1 specifications.

   [X9.55]    ANSI X9.55-1997, Public Key Cryptography for the Financial
              Services Industry: Extensions to Public Key Certificates
              and Certificate Revocation Lists, January 1997.
















Cooper, et al.              Standards Track                   [Page 109]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


Appendix A.  Pseudo-ASN.1 Structures and OIDs

   This appendix describes data objects used by conforming PKI
   components in an "ASN.1-like" syntax.  This syntax is a hybrid of the
   1988 and 1993 ASN.1 syntaxes.  The 1988 ASN.1 syntax is augmented
   with 1993 UNIVERSAL Types UniversalString, BMPString, and UTF8String.

   The ASN.1 syntax does not permit the inclusion of type statements in
   the ASN.1 module, and the 1993 ASN.1 standard does not permit use of
   the new UNIVERSAL types in modules using the 1988 syntax.  As a
   result, this module does not conform to either version of the ASN.1
   standard.

   This appendix may be converted into 1988 ASN.1 by replacing the
   definitions for the UNIVERSAL Types with the 1988 catch-all "ANY".

A.1.  Explicitly Tagged Module, 1988 Syntax

PKIX1Explicit88 { iso(1) identified-organization(3) dod(6) internet(1)
  security(5) mechanisms(5) pkix(7) id-mod(0) id-pkix1-explicit(18) }

DEFINITIONS EXPLICIT TAGS ::=

BEGIN

-- EXPORTS ALL --

-- IMPORTS NONE --

-- UNIVERSAL Types defined in 1993 and 1998 ASN.1
-- and required by this specification

UniversalString ::= [UNIVERSAL 28] IMPLICIT OCTET STRING
        -- UniversalString is defined in ASN.1:1993

BMPString ::= [UNIVERSAL 30] IMPLICIT OCTET STRING
      -- BMPString is the subtype of UniversalString and models
      -- the Basic Multilingual Plane of ISO/IEC 10646

UTF8String ::= [UNIVERSAL 12] IMPLICIT OCTET STRING
      -- The content of this type conforms to RFC 3629.

-- PKIX specific OIDs

id-pkix  OBJECT IDENTIFIER  ::=
         { iso(1) identified-organization(3) dod(6) internet(1)
                    security(5) mechanisms(5) pkix(7) }




Cooper, et al.              Standards Track                   [Page 110]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- PKIX arcs

id-pe OBJECT IDENTIFIER ::= { id-pkix 1 }
        -- arc for private certificate extensions
id-qt OBJECT IDENTIFIER ::= { id-pkix 2 }
        -- arc for policy qualifier types
id-kp OBJECT IDENTIFIER ::= { id-pkix 3 }
        -- arc for extended key purpose OIDS
id-ad OBJECT IDENTIFIER ::= { id-pkix 48 }
        -- arc for access descriptors

-- policyQualifierIds for Internet policy qualifiers

id-qt-cps      OBJECT IDENTIFIER ::=  { id-qt 1 }
      -- OID for CPS qualifier
id-qt-unotice  OBJECT IDENTIFIER ::=  { id-qt 2 }
      -- OID for user notice qualifier

-- access descriptor definitions

id-ad-ocsp         OBJECT IDENTIFIER ::= { id-ad 1 }
id-ad-caIssuers    OBJECT IDENTIFIER ::= { id-ad 2 }
id-ad-timeStamping OBJECT IDENTIFIER ::= { id-ad 3 }
id-ad-caRepository OBJECT IDENTIFIER ::= { id-ad 5 }

-- attribute data types

Attribute               ::= SEQUENCE {
      type             AttributeType,
      values    SET OF AttributeValue }
            -- at least one value is required

AttributeType           ::= OBJECT IDENTIFIER

AttributeValue          ::= ANY -- DEFINED BY AttributeType

AttributeTypeAndValue   ::= SEQUENCE {
        type    AttributeType,
        value   AttributeValue }

-- suggested naming attributes: Definition of the following
--   information object set may be augmented to meet local
--   requirements.  Note that deleting members of the set may
--   prevent interoperability with conforming implementations.
-- presented in pairs: the AttributeType followed by the
--   type definition for the corresponding AttributeValue





Cooper, et al.              Standards Track                   [Page 111]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Arc for standard naming attributes

id-at OBJECT IDENTIFIER ::= { joint-iso-ccitt(2) ds(5) 4 }

-- Naming attributes of type X520name

id-at-name                AttributeType ::= { id-at 41 }
id-at-surname             AttributeType ::= { id-at  4 }
id-at-givenName           AttributeType ::= { id-at 42 }
id-at-initials            AttributeType ::= { id-at 43 }
id-at-generationQualifier AttributeType ::= { id-at 44 }

-- Naming attributes of type X520Name:
--   X520name ::= DirectoryString (SIZE (1..ub-name))
--
-- Expanded to avoid parameterized type:
X520name ::= CHOICE {
      teletexString     TeletexString   (SIZE (1..ub-name)),
      printableString   PrintableString (SIZE (1..ub-name)),
      universalString   UniversalString (SIZE (1..ub-name)),
      utf8String        UTF8String      (SIZE (1..ub-name)),
      bmpString         BMPString       (SIZE (1..ub-name)) }

-- Naming attributes of type X520CommonName

id-at-commonName        AttributeType ::= { id-at 3 }

-- Naming attributes of type X520CommonName:
--   X520CommonName ::= DirectoryName (SIZE (1..ub-common-name))
--
-- Expanded to avoid parameterized type:
X520CommonName ::= CHOICE {
      teletexString     TeletexString   (SIZE (1..ub-common-name)),
      printableString   PrintableString (SIZE (1..ub-common-name)),
      universalString   UniversalString (SIZE (1..ub-common-name)),
      utf8String        UTF8String      (SIZE (1..ub-common-name)),
      bmpString         BMPString       (SIZE (1..ub-common-name)) }














Cooper, et al.              Standards Track                   [Page 112]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Naming attributes of type X520LocalityName

id-at-localityName      AttributeType ::= { id-at 7 }

-- Naming attributes of type X520LocalityName:
--   X520LocalityName ::= DirectoryName (SIZE (1..ub-locality-name))
--
-- Expanded to avoid parameterized type:
X520LocalityName ::= CHOICE {
      teletexString     TeletexString   (SIZE (1..ub-locality-name)),
      printableString   PrintableString (SIZE (1..ub-locality-name)),
      universalString   UniversalString (SIZE (1..ub-locality-name)),
      utf8String        UTF8String      (SIZE (1..ub-locality-name)),
      bmpString         BMPString       (SIZE (1..ub-locality-name)) }

-- Naming attributes of type X520StateOrProvinceName

id-at-stateOrProvinceName AttributeType ::= { id-at 8 }

-- Naming attributes of type X520StateOrProvinceName:
--   X520StateOrProvinceName ::= DirectoryName (SIZE (1..ub-state-name))
--
-- Expanded to avoid parameterized type:
X520StateOrProvinceName ::= CHOICE {
      teletexString     TeletexString   (SIZE (1..ub-state-name)),
      printableString   PrintableString (SIZE (1..ub-state-name)),
      universalString   UniversalString (SIZE (1..ub-state-name)),
      utf8String        UTF8String      (SIZE (1..ub-state-name)),
      bmpString         BMPString       (SIZE (1..ub-state-name)) }






















Cooper, et al.              Standards Track                   [Page 113]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Naming attributes of type X520OrganizationName

id-at-organizationName  AttributeType ::= { id-at 10 }

-- Naming attributes of type X520OrganizationName:
--   X520OrganizationName ::=
--          DirectoryName (SIZE (1..ub-organization-name))
--
-- Expanded to avoid parameterized type:
X520OrganizationName ::= CHOICE {
      teletexString     TeletexString
                          (SIZE (1..ub-organization-name)),
      printableString   PrintableString
                          (SIZE (1..ub-organization-name)),
      universalString   UniversalString
                          (SIZE (1..ub-organization-name)),
      utf8String        UTF8String
                          (SIZE (1..ub-organization-name)),
      bmpString         BMPString
                          (SIZE (1..ub-organization-name))  }

-- Naming attributes of type X520OrganizationalUnitName

id-at-organizationalUnitName AttributeType ::= { id-at 11 }

-- Naming attributes of type X520OrganizationalUnitName:
--   X520OrganizationalUnitName ::=
--          DirectoryName (SIZE (1..ub-organizational-unit-name))
--
-- Expanded to avoid parameterized type:
X520OrganizationalUnitName ::= CHOICE {
      teletexString     TeletexString
                          (SIZE (1..ub-organizational-unit-name)),
      printableString   PrintableString
                          (SIZE (1..ub-organizational-unit-name)),
      universalString   UniversalString
                          (SIZE (1..ub-organizational-unit-name)),
      utf8String        UTF8String
                          (SIZE (1..ub-organizational-unit-name)),
      bmpString         BMPString
                          (SIZE (1..ub-organizational-unit-name)) }










Cooper, et al.              Standards Track                   [Page 114]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Naming attributes of type X520Title

id-at-title             AttributeType ::= { id-at 12 }

-- Naming attributes of type X520Title:
--   X520Title ::= DirectoryName (SIZE (1..ub-title))
--
-- Expanded to avoid parameterized type:
X520Title ::= CHOICE {
      teletexString     TeletexString   (SIZE (1..ub-title)),
      printableString   PrintableString (SIZE (1..ub-title)),
      universalString   UniversalString (SIZE (1..ub-title)),
      utf8String        UTF8String      (SIZE (1..ub-title)),
      bmpString         BMPString       (SIZE (1..ub-title)) }

-- Naming attributes of type X520dnQualifier

id-at-dnQualifier       AttributeType ::= { id-at 46 }

X520dnQualifier ::=     PrintableString

-- Naming attributes of type X520countryName (digraph from IS 3166)

id-at-countryName       AttributeType ::= { id-at 6 }

X520countryName ::=     PrintableString (SIZE (2))

-- Naming attributes of type X520SerialNumber

id-at-serialNumber      AttributeType ::= { id-at 5 }

X520SerialNumber ::=    PrintableString (SIZE (1..ub-serial-number))

-- Naming attributes of type X520Pseudonym

id-at-pseudonym         AttributeType ::= { id-at 65 }

-- Naming attributes of type X520Pseudonym:
--   X520Pseudonym ::= DirectoryName (SIZE (1..ub-pseudonym))
--
-- Expanded to avoid parameterized type:
X520Pseudonym ::= CHOICE {
   teletexString     TeletexString   (SIZE (1..ub-pseudonym)),
   printableString   PrintableString (SIZE (1..ub-pseudonym)),
   universalString   UniversalString (SIZE (1..ub-pseudonym)),
   utf8String        UTF8String      (SIZE (1..ub-pseudonym)),
   bmpString         BMPString       (SIZE (1..ub-pseudonym)) }




Cooper, et al.              Standards Track                   [Page 115]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Naming attributes of type DomainComponent (from RFC 4519)

id-domainComponent   AttributeType ::= { 0 9 2342 19200300 100 1 25 }

DomainComponent ::=  IA5String

-- Legacy attributes

pkcs-9 OBJECT IDENTIFIER ::=
       { iso(1) member-body(2) us(840) rsadsi(113549) pkcs(1) 9 }

id-emailAddress      AttributeType ::= { pkcs-9 1 }

EmailAddress ::=     IA5String (SIZE (1..ub-emailaddress-length))

-- naming data types --

Name ::= CHOICE { -- only one possibility for now --
      rdnSequence  RDNSequence }

RDNSequence ::= SEQUENCE OF RelativeDistinguishedName

DistinguishedName ::=   RDNSequence

RelativeDistinguishedName ::= SET SIZE (1..MAX) OF AttributeTypeAndValue

-- Directory string type --

DirectoryString ::= CHOICE {
      teletexString       TeletexString   (SIZE (1..MAX)),
      printableString     PrintableString (SIZE (1..MAX)),
      universalString     UniversalString (SIZE (1..MAX)),
      utf8String          UTF8String      (SIZE (1..MAX)),
      bmpString           BMPString       (SIZE (1..MAX)) }

-- certificate and CRL specific structures begin here

Certificate  ::=  SEQUENCE  {
     tbsCertificate       TBSCertificate,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }










Cooper, et al.              Standards Track                   [Page 116]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


TBSCertificate  ::=  SEQUENCE  {
     version         [0]  Version DEFAULT v1,
     serialNumber         CertificateSerialNumber,
     signature            AlgorithmIdentifier,
     issuer               Name,
     validity             Validity,
     subject              Name,
     subjectPublicKeyInfo SubjectPublicKeyInfo,
     issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
                          -- If present, version MUST be v2 or v3
     subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
                          -- If present, version MUST be v2 or v3
     extensions      [3]  Extensions OPTIONAL
                          -- If present, version MUST be v3 --  }

Version  ::=  INTEGER  {  v1(0), v2(1), v3(2)  }

CertificateSerialNumber  ::=  INTEGER

Validity ::= SEQUENCE {
     notBefore      Time,
     notAfter       Time  }

Time ::= CHOICE {
     utcTime        UTCTime,
     generalTime    GeneralizedTime }

UniqueIdentifier  ::=  BIT STRING

SubjectPublicKeyInfo  ::=  SEQUENCE  {
     algorithm            AlgorithmIdentifier,
     subjectPublicKey     BIT STRING  }

Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension

Extension  ::=  SEQUENCE  {
     extnID      OBJECT IDENTIFIER,
     critical    BOOLEAN DEFAULT FALSE,
     extnValue   OCTET STRING
                 -- contains the DER encoding of an ASN.1 value
                 -- corresponding to the extension type identified
                 -- by extnID
     }








Cooper, et al.              Standards Track                   [Page 117]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- CRL structures

CertificateList  ::=  SEQUENCE  {
     tbsCertList          TBSCertList,
     signatureAlgorithm   AlgorithmIdentifier,
     signature            BIT STRING  }

TBSCertList  ::=  SEQUENCE  {
     version                 Version OPTIONAL,
                                   -- if present, MUST be v2
     signature               AlgorithmIdentifier,
     issuer                  Name,
     thisUpdate              Time,
     nextUpdate              Time OPTIONAL,
     revokedCertificates     SEQUENCE OF SEQUENCE  {
          userCertificate         CertificateSerialNumber,
          revocationDate          Time,
          crlEntryExtensions      Extensions OPTIONAL
                                   -- if present, version MUST be v2
                               }  OPTIONAL,
     crlExtensions           [0] Extensions OPTIONAL }
                                   -- if present, version MUST be v2

-- Version, Time, CertificateSerialNumber, and Extensions were
-- defined earlier for use in the certificate structure

AlgorithmIdentifier  ::=  SEQUENCE  {
     algorithm               OBJECT IDENTIFIER,
     parameters              ANY DEFINED BY algorithm OPTIONAL  }
                                -- contains a value of the type
                                -- registered for use with the
                                -- algorithm object identifier value

-- X.400 address syntax starts here

ORAddress ::= SEQUENCE {
   built-in-standard-attributes BuiltInStandardAttributes,
   built-in-domain-defined-attributes
                   BuiltInDomainDefinedAttributes OPTIONAL,
   -- see also teletex-domain-defined-attributes
   extension-attributes ExtensionAttributes OPTIONAL }










Cooper, et al.              Standards Track                   [Page 118]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- Built-in Standard Attributes

BuiltInStandardAttributes ::= SEQUENCE {
   country-name                  CountryName OPTIONAL,
   administration-domain-name    AdministrationDomainName OPTIONAL,
   network-address           [0] IMPLICIT NetworkAddress OPTIONAL,
     -- see also extended-network-address
   terminal-identifier       [1] IMPLICIT TerminalIdentifier OPTIONAL,
   private-domain-name       [2] PrivateDomainName OPTIONAL,
   organization-name         [3] IMPLICIT OrganizationName OPTIONAL,
     -- see also teletex-organization-name
   numeric-user-identifier   [4] IMPLICIT NumericUserIdentifier
                                 OPTIONAL,
   personal-name             [5] IMPLICIT PersonalName OPTIONAL,
     -- see also teletex-personal-name
   organizational-unit-names [6] IMPLICIT OrganizationalUnitNames
                                 OPTIONAL }
     -- see also teletex-organizational-unit-names

CountryName ::= [APPLICATION 1] CHOICE {
   x121-dcc-code         NumericString
                           (SIZE (ub-country-name-numeric-length)),
   iso-3166-alpha2-code  PrintableString
                           (SIZE (ub-country-name-alpha-length)) }

AdministrationDomainName ::= [APPLICATION 2] CHOICE {
   numeric   NumericString   (SIZE (0..ub-domain-name-length)),
   printable PrintableString (SIZE (0..ub-domain-name-length)) }

NetworkAddress ::= X121Address  -- see also extended-network-address

X121Address ::= NumericString (SIZE (1..ub-x121-address-length))

TerminalIdentifier ::= PrintableString (SIZE (1..ub-terminal-id-length))

PrivateDomainName ::= CHOICE {
   numeric   NumericString   (SIZE (1..ub-domain-name-length)),
   printable PrintableString (SIZE (1..ub-domain-name-length)) }

OrganizationName ::= PrintableString
                            (SIZE (1..ub-organization-name-length))
  -- see also teletex-organization-name

NumericUserIdentifier ::= NumericString
                            (SIZE (1..ub-numeric-user-id-length))






Cooper, et al.              Standards Track                   [Page 119]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


PersonalName ::= SET {
   surname     [0] IMPLICIT PrintableString
                    (SIZE (1..ub-surname-length)),
   given-name  [1] IMPLICIT PrintableString
                    (SIZE (1..ub-given-name-length)) OPTIONAL,
   initials    [2] IMPLICIT PrintableString
                    (SIZE (1..ub-initials-length)) OPTIONAL,
   generation-qualifier [3] IMPLICIT PrintableString
                    (SIZE (1..ub-generation-qualifier-length))
                    OPTIONAL }
  -- see also teletex-personal-name

OrganizationalUnitNames ::= SEQUENCE SIZE (1..ub-organizational-units)
                             OF OrganizationalUnitName
  -- see also teletex-organizational-unit-names

OrganizationalUnitName ::= PrintableString (SIZE
                    (1..ub-organizational-unit-name-length))

-- Built-in Domain-defined Attributes

BuiltInDomainDefinedAttributes ::= SEQUENCE SIZE
                    (1..ub-domain-defined-attributes) OF
                    BuiltInDomainDefinedAttribute

BuiltInDomainDefinedAttribute ::= SEQUENCE {
   type PrintableString (SIZE
                   (1..ub-domain-defined-attribute-type-length)),
   value PrintableString (SIZE
                   (1..ub-domain-defined-attribute-value-length)) }

-- Extension Attributes

ExtensionAttributes ::= SET SIZE (1..ub-extension-attributes) OF
               ExtensionAttribute

ExtensionAttribute ::=  SEQUENCE {
   extension-attribute-type [0] IMPLICIT INTEGER
                   (0..ub-extension-attributes),
   extension-attribute-value [1]
                   ANY DEFINED BY extension-attribute-type }

-- Extension types and attribute values

common-name INTEGER ::= 1

CommonName ::= PrintableString (SIZE (1..ub-common-name-length))




Cooper, et al.              Standards Track                   [Page 120]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


teletex-common-name INTEGER ::= 2

TeletexCommonName ::= TeletexString (SIZE (1..ub-common-name-length))

teletex-organization-name INTEGER ::= 3

TeletexOrganizationName ::=
                TeletexString (SIZE (1..ub-organization-name-length))

teletex-personal-name INTEGER ::= 4

TeletexPersonalName ::= SET {
   surname     [0] IMPLICIT TeletexString
                    (SIZE (1..ub-surname-length)),
   given-name  [1] IMPLICIT TeletexString
                    (SIZE (1..ub-given-name-length)) OPTIONAL,
   initials    [2] IMPLICIT TeletexString
                    (SIZE (1..ub-initials-length)) OPTIONAL,
   generation-qualifier [3] IMPLICIT TeletexString
                    (SIZE (1..ub-generation-qualifier-length))
                    OPTIONAL }

teletex-organizational-unit-names INTEGER ::= 5

TeletexOrganizationalUnitNames ::= SEQUENCE SIZE
      (1..ub-organizational-units) OF TeletexOrganizationalUnitName

TeletexOrganizationalUnitName ::= TeletexString
                  (SIZE (1..ub-organizational-unit-name-length))

pds-name INTEGER ::= 7

PDSName ::= PrintableString (SIZE (1..ub-pds-name-length))

physical-delivery-country-name INTEGER ::= 8

PhysicalDeliveryCountryName ::= CHOICE {
   x121-dcc-code NumericString (SIZE (ub-country-name-numeric-length)),
   iso-3166-alpha2-code PrintableString
                               (SIZE (ub-country-name-alpha-length)) }

postal-code INTEGER ::= 9

PostalCode ::= CHOICE {
   numeric-code   NumericString (SIZE (1..ub-postal-code-length)),
   printable-code PrintableString (SIZE (1..ub-postal-code-length)) }

physical-delivery-office-name INTEGER ::= 10



Cooper, et al.              Standards Track                   [Page 121]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


PhysicalDeliveryOfficeName ::= PDSParameter

physical-delivery-office-number INTEGER ::= 11

PhysicalDeliveryOfficeNumber ::= PDSParameter

extension-OR-address-components INTEGER ::= 12

ExtensionORAddressComponents ::= PDSParameter

physical-delivery-personal-name INTEGER ::= 13

PhysicalDeliveryPersonalName ::= PDSParameter

physical-delivery-organization-name INTEGER ::= 14

PhysicalDeliveryOrganizationName ::= PDSParameter

extension-physical-delivery-address-components INTEGER ::= 15

ExtensionPhysicalDeliveryAddressComponents ::= PDSParameter

unformatted-postal-address INTEGER ::= 16

UnformattedPostalAddress ::= SET {
   printable-address SEQUENCE SIZE (1..ub-pds-physical-address-lines)
        OF PrintableString (SIZE (1..ub-pds-parameter-length)) OPTIONAL,
   teletex-string TeletexString
        (SIZE (1..ub-unformatted-address-length)) OPTIONAL }

street-address INTEGER ::= 17

StreetAddress ::= PDSParameter

post-office-box-address INTEGER ::= 18

PostOfficeBoxAddress ::= PDSParameter

poste-restante-address INTEGER ::= 19

PosteRestanteAddress ::= PDSParameter

unique-postal-name INTEGER ::= 20

UniquePostalName ::= PDSParameter

local-postal-attributes INTEGER ::= 21




Cooper, et al.              Standards Track                   [Page 122]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


LocalPostalAttributes ::= PDSParameter

PDSParameter ::= SET {
   printable-string PrintableString
                (SIZE(1..ub-pds-parameter-length)) OPTIONAL,
   teletex-string TeletexString
                (SIZE(1..ub-pds-parameter-length)) OPTIONAL }

extended-network-address INTEGER ::= 22

ExtendedNetworkAddress ::= CHOICE {
   e163-4-address SEQUENCE {
      number      [0] IMPLICIT NumericString
                       (SIZE (1..ub-e163-4-number-length)),
      sub-address [1] IMPLICIT NumericString
                       (SIZE (1..ub-e163-4-sub-address-length))
                       OPTIONAL },
   psap-address   [0] IMPLICIT PresentationAddress }

PresentationAddress ::= SEQUENCE {
    pSelector     [0] EXPLICIT OCTET STRING OPTIONAL,
    sSelector     [1] EXPLICIT OCTET STRING OPTIONAL,
    tSelector     [2] EXPLICIT OCTET STRING OPTIONAL,
    nAddresses    [3] EXPLICIT SET SIZE (1..MAX) OF OCTET STRING }

terminal-type  INTEGER ::= 23

TerminalType ::= INTEGER {
   telex        (3),
   teletex      (4),
   g3-facsimile (5),
   g4-facsimile (6),
   ia5-terminal (7),
   videotex     (8) } (0..ub-integer-options)

-- Extension Domain-defined Attributes

teletex-domain-defined-attributes INTEGER ::= 6

TeletexDomainDefinedAttributes ::= SEQUENCE SIZE
   (1..ub-domain-defined-attributes) OF TeletexDomainDefinedAttribute

TeletexDomainDefinedAttribute ::= SEQUENCE {
        type TeletexString
               (SIZE (1..ub-domain-defined-attribute-type-length)),
        value TeletexString
               (SIZE (1..ub-domain-defined-attribute-value-length)) }




Cooper, et al.              Standards Track                   [Page 123]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


--  specifications of Upper Bounds MUST be regarded as mandatory
--  from Annex B of ITU-T X.411 Reference Definition of MTS Parameter
--  Upper Bounds

-- Upper Bounds
ub-name INTEGER ::= 32768
ub-common-name INTEGER ::= 64
ub-locality-name INTEGER ::= 128
ub-state-name INTEGER ::= 128
ub-organization-name INTEGER ::= 64
ub-organizational-unit-name INTEGER ::= 64
ub-title INTEGER ::= 64
ub-serial-number INTEGER ::= 64
ub-match INTEGER ::= 128
ub-emailaddress-length INTEGER ::= 255
ub-common-name-length INTEGER ::= 64
ub-country-name-alpha-length INTEGER ::= 2
ub-country-name-numeric-length INTEGER ::= 3
ub-domain-defined-attributes INTEGER ::= 4
ub-domain-defined-attribute-type-length INTEGER ::= 8
ub-domain-defined-attribute-value-length INTEGER ::= 128
ub-domain-name-length INTEGER ::= 16
ub-extension-attributes INTEGER ::= 256
ub-e163-4-number-length INTEGER ::= 15
ub-e163-4-sub-address-length INTEGER ::= 40
ub-generation-qualifier-length INTEGER ::= 3
ub-given-name-length INTEGER ::= 16
ub-initials-length INTEGER ::= 5
ub-integer-options INTEGER ::= 256
ub-numeric-user-id-length INTEGER ::= 32
ub-organization-name-length INTEGER ::= 64
ub-organizational-unit-name-length INTEGER ::= 32
ub-organizational-units INTEGER ::= 4
ub-pds-name-length INTEGER ::= 16
ub-pds-parameter-length INTEGER ::= 30
ub-pds-physical-address-lines INTEGER ::= 6
ub-postal-code-length INTEGER ::= 16
ub-pseudonym INTEGER ::= 128
ub-surname-length INTEGER ::= 40
ub-terminal-id-length INTEGER ::= 24
ub-unformatted-address-length INTEGER ::= 180
ub-x121-address-length INTEGER ::= 16

-- Note - upper bounds on string types, such as TeletexString, are
-- measured in characters.  Excepting PrintableString or IA5String, a
-- significantly greater number of octets will be required to hold
-- such a value.  As a minimum, 16 octets, or twice the specified
-- upper bound, whichever is the larger, should be allowed for



Cooper, et al.              Standards Track                   [Page 124]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- TeletexString.  For UTF8String or UniversalString at least four
-- times the upper bound should be allowed.

END

A.2.  Implicitly Tagged Module, 1988 Syntax

PKIX1Implicit88 { iso(1) identified-organization(3) dod(6) internet(1)
  security(5) mechanisms(5) pkix(7) id-mod(0) id-pkix1-implicit(19) }

DEFINITIONS IMPLICIT TAGS ::=

BEGIN

-- EXPORTS ALL --

IMPORTS
      id-pe, id-kp, id-qt-unotice, id-qt-cps,
      -- delete following line if "new" types are supported --
      BMPString, UTF8String,  -- end "new" types --
      ORAddress, Name, RelativeDistinguishedName,
      CertificateSerialNumber, Attribute, DirectoryString
      FROM PKIX1Explicit88 { iso(1) identified-organization(3)
            dod(6) internet(1) security(5) mechanisms(5) pkix(7)
            id-mod(0) id-pkix1-explicit(18) };

-- ISO arc for standard certificate and CRL extensions

id-ce OBJECT IDENTIFIER  ::=  {joint-iso-ccitt(2) ds(5) 29}

-- authority key identifier OID and syntax

id-ce-authorityKeyIdentifier OBJECT IDENTIFIER ::=  { id-ce 35 }

AuthorityKeyIdentifier ::= SEQUENCE {
    keyIdentifier             [0] KeyIdentifier            OPTIONAL,
    authorityCertIssuer       [1] GeneralNames             OPTIONAL,
    authorityCertSerialNumber [2] CertificateSerialNumber  OPTIONAL }
    -- authorityCertIssuer and authorityCertSerialNumber MUST both
    -- be present or both be absent

KeyIdentifier ::= OCTET STRING









Cooper, et al.              Standards Track                   [Page 125]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- subject key identifier OID and syntax

id-ce-subjectKeyIdentifier OBJECT IDENTIFIER ::=  { id-ce 14 }

SubjectKeyIdentifier ::= KeyIdentifier

-- key usage extension OID and syntax

id-ce-keyUsage OBJECT IDENTIFIER ::=  { id-ce 15 }

KeyUsage ::= BIT STRING {
     digitalSignature        (0),
     nonRepudiation          (1),  -- recent editions of X.509 have
                                -- renamed this bit to contentCommitment
     keyEncipherment         (2),
     dataEncipherment        (3),
     keyAgreement            (4),
     keyCertSign             (5),
     cRLSign                 (6),
     encipherOnly            (7),
     decipherOnly            (8) }

-- private key usage period extension OID and syntax

id-ce-privateKeyUsagePeriod OBJECT IDENTIFIER ::=  { id-ce 16 }

PrivateKeyUsagePeriod ::= SEQUENCE {
     notBefore       [0]     GeneralizedTime OPTIONAL,
     notAfter        [1]     GeneralizedTime OPTIONAL }
     -- either notBefore or notAfter MUST be present

-- certificate policies extension OID and syntax

id-ce-certificatePolicies OBJECT IDENTIFIER ::=  { id-ce 32 }

anyPolicy OBJECT IDENTIFIER ::= { id-ce-certificatePolicies 0 }

CertificatePolicies ::= SEQUENCE SIZE (1..MAX) OF PolicyInformation

PolicyInformation ::= SEQUENCE {
     policyIdentifier   CertPolicyId,
     policyQualifiers   SEQUENCE SIZE (1..MAX) OF
             PolicyQualifierInfo OPTIONAL }

CertPolicyId ::= OBJECT IDENTIFIER






Cooper, et al.              Standards Track                   [Page 126]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


PolicyQualifierInfo ::= SEQUENCE {
     policyQualifierId  PolicyQualifierId,
     qualifier          ANY DEFINED BY policyQualifierId }

-- Implementations that recognize additional policy qualifiers MUST
-- augment the following definition for PolicyQualifierId

PolicyQualifierId ::= OBJECT IDENTIFIER ( id-qt-cps | id-qt-unotice )

-- CPS pointer qualifier

CPSuri ::= IA5String

-- user notice qualifier

UserNotice ::= SEQUENCE {
     noticeRef        NoticeReference OPTIONAL,
     explicitText     DisplayText OPTIONAL }

NoticeReference ::= SEQUENCE {
     organization     DisplayText,
     noticeNumbers    SEQUENCE OF INTEGER }

DisplayText ::= CHOICE {
     ia5String        IA5String      (SIZE (1..200)),
     visibleString    VisibleString  (SIZE (1..200)),
     bmpString        BMPString      (SIZE (1..200)),
     utf8String       UTF8String     (SIZE (1..200)) }

-- policy mapping extension OID and syntax

id-ce-policyMappings OBJECT IDENTIFIER ::=  { id-ce 33 }

PolicyMappings ::= SEQUENCE SIZE (1..MAX) OF SEQUENCE {
     issuerDomainPolicy      CertPolicyId,
     subjectDomainPolicy     CertPolicyId }

-- subject alternative name extension OID and syntax

id-ce-subjectAltName OBJECT IDENTIFIER ::=  { id-ce 17 }

SubjectAltName ::= GeneralNames

GeneralNames ::= SEQUENCE SIZE (1..MAX) OF GeneralName







Cooper, et al.              Standards Track                   [Page 127]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


GeneralName ::= CHOICE {
     otherName                 [0]  AnotherName,
     rfc822Name                [1]  IA5String,
     dNSName                   [2]  IA5String,
     x400Address               [3]  ORAddress,
     directoryName             [4]  Name,
     ediPartyName              [5]  EDIPartyName,
     uniformResourceIdentifier [6]  IA5String,
     iPAddress                 [7]  OCTET STRING,
     registeredID              [8]  OBJECT IDENTIFIER }

-- AnotherName replaces OTHER-NAME ::= TYPE-IDENTIFIER, as
-- TYPE-IDENTIFIER is not supported in the '88 ASN.1 syntax

AnotherName ::= SEQUENCE {
     type-id    OBJECT IDENTIFIER,
     value      [0] EXPLICIT ANY DEFINED BY type-id }

EDIPartyName ::= SEQUENCE {
     nameAssigner              [0]  DirectoryString OPTIONAL,
     partyName                 [1]  DirectoryString }

-- issuer alternative name extension OID and syntax

id-ce-issuerAltName OBJECT IDENTIFIER ::=  { id-ce 18 }

IssuerAltName ::= GeneralNames

id-ce-subjectDirectoryAttributes OBJECT IDENTIFIER ::=  { id-ce 9 }

SubjectDirectoryAttributes ::= SEQUENCE SIZE (1..MAX) OF Attribute

-- basic constraints extension OID and syntax

id-ce-basicConstraints OBJECT IDENTIFIER ::=  { id-ce 19 }

BasicConstraints ::= SEQUENCE {
     cA                      BOOLEAN DEFAULT FALSE,
     pathLenConstraint       INTEGER (0..MAX) OPTIONAL }












Cooper, et al.              Standards Track                   [Page 128]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- name constraints extension OID and syntax

id-ce-nameConstraints OBJECT IDENTIFIER ::=  { id-ce 30 }

NameConstraints ::= SEQUENCE {
     permittedSubtrees       [0]     GeneralSubtrees OPTIONAL,
     excludedSubtrees        [1]     GeneralSubtrees OPTIONAL }

GeneralSubtrees ::= SEQUENCE SIZE (1..MAX) OF GeneralSubtree

GeneralSubtree ::= SEQUENCE {
     base                    GeneralName,
     minimum         [0]     BaseDistance DEFAULT 0,
     maximum         [1]     BaseDistance OPTIONAL }

BaseDistance ::= INTEGER (0..MAX)

-- policy constraints extension OID and syntax

id-ce-policyConstraints OBJECT IDENTIFIER ::=  { id-ce 36 }

PolicyConstraints ::= SEQUENCE {
     requireExplicitPolicy   [0]     SkipCerts OPTIONAL,
     inhibitPolicyMapping    [1]     SkipCerts OPTIONAL }

SkipCerts ::= INTEGER (0..MAX)

-- CRL distribution points extension OID and syntax

id-ce-cRLDistributionPoints     OBJECT IDENTIFIER  ::=  {id-ce 31}

CRLDistributionPoints ::= SEQUENCE SIZE (1..MAX) OF DistributionPoint

DistributionPoint ::= SEQUENCE {
     distributionPoint       [0]     DistributionPointName OPTIONAL,
     reasons                 [1]     ReasonFlags OPTIONAL,
     cRLIssuer               [2]     GeneralNames OPTIONAL }

DistributionPointName ::= CHOICE {
     fullName                [0]     GeneralNames,
     nameRelativeToCRLIssuer [1]     RelativeDistinguishedName }










Cooper, et al.              Standards Track                   [Page 129]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


ReasonFlags ::= BIT STRING {
     unused                  (0),
     keyCompromise           (1),
     cACompromise            (2),
     affiliationChanged      (3),
     superseded              (4),
     cessationOfOperation    (5),
     certificateHold         (6),
     privilegeWithdrawn      (7),
     aACompromise            (8) }

-- extended key usage extension OID and syntax

id-ce-extKeyUsage OBJECT IDENTIFIER ::= {id-ce 37}

ExtKeyUsageSyntax ::= SEQUENCE SIZE (1..MAX) OF KeyPurposeId

KeyPurposeId ::= OBJECT IDENTIFIER

-- permit unspecified key uses

anyExtendedKeyUsage OBJECT IDENTIFIER ::= { id-ce-extKeyUsage 0 }

-- extended key purpose OIDs

id-kp-serverAuth             OBJECT IDENTIFIER ::= { id-kp 1 }
id-kp-clientAuth             OBJECT IDENTIFIER ::= { id-kp 2 }
id-kp-codeSigning            OBJECT IDENTIFIER ::= { id-kp 3 }
id-kp-emailProtection        OBJECT IDENTIFIER ::= { id-kp 4 }
id-kp-timeStamping           OBJECT IDENTIFIER ::= { id-kp 8 }
id-kp-OCSPSigning            OBJECT IDENTIFIER ::= { id-kp 9 }

-- inhibit any policy OID and syntax

id-ce-inhibitAnyPolicy OBJECT IDENTIFIER ::=  { id-ce 54 }

InhibitAnyPolicy ::= SkipCerts

-- freshest (delta)CRL extension OID and syntax

id-ce-freshestCRL OBJECT IDENTIFIER ::=  { id-ce 46 }

FreshestCRL ::= CRLDistributionPoints








Cooper, et al.              Standards Track                   [Page 130]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- authority info access

id-pe-authorityInfoAccess OBJECT IDENTIFIER ::= { id-pe 1 }

AuthorityInfoAccessSyntax  ::=
        SEQUENCE SIZE (1..MAX) OF AccessDescription

AccessDescription  ::=  SEQUENCE {
        accessMethod          OBJECT IDENTIFIER,
        accessLocation        GeneralName  }

-- subject info access

id-pe-subjectInfoAccess OBJECT IDENTIFIER ::= { id-pe 11 }

SubjectInfoAccessSyntax  ::=
        SEQUENCE SIZE (1..MAX) OF AccessDescription

-- CRL number extension OID and syntax

id-ce-cRLNumber OBJECT IDENTIFIER ::= { id-ce 20 }

CRLNumber ::= INTEGER (0..MAX)

-- issuing distribution point extension OID and syntax

id-ce-issuingDistributionPoint OBJECT IDENTIFIER ::= { id-ce 28 }

IssuingDistributionPoint ::= SEQUENCE {
     distributionPoint          [0] DistributionPointName OPTIONAL,
     onlyContainsUserCerts      [1] BOOLEAN DEFAULT FALSE,
     onlyContainsCACerts        [2] BOOLEAN DEFAULT FALSE,
     onlySomeReasons            [3] ReasonFlags OPTIONAL,
     indirectCRL                [4] BOOLEAN DEFAULT FALSE,
     onlyContainsAttributeCerts [5] BOOLEAN DEFAULT FALSE }
     -- at most one of onlyContainsUserCerts, onlyContainsCACerts,
     -- and onlyContainsAttributeCerts may be set to TRUE.

id-ce-deltaCRLIndicator OBJECT IDENTIFIER ::= { id-ce 27 }

BaseCRLNumber ::= CRLNumber










Cooper, et al.              Standards Track                   [Page 131]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- reason code extension OID and syntax

id-ce-cRLReasons OBJECT IDENTIFIER ::= { id-ce 21 }

CRLReason ::= ENUMERATED {
     unspecified             (0),
     keyCompromise           (1),
     cACompromise            (2),
     affiliationChanged      (3),
     superseded              (4),
     cessationOfOperation    (5),
     certificateHold         (6),
     removeFromCRL           (8),
     privilegeWithdrawn      (9),
     aACompromise           (10) }

-- certificate issuer CRL entry extension OID and syntax

id-ce-certificateIssuer OBJECT IDENTIFIER ::= { id-ce 29 }

CertificateIssuer ::= GeneralNames

-- hold instruction extension OID and syntax

id-ce-holdInstructionCode OBJECT IDENTIFIER ::= { id-ce 23 }

HoldInstructionCode ::= OBJECT IDENTIFIER

-- ANSI x9 arc holdinstruction arc

holdInstruction OBJECT IDENTIFIER ::=
          {joint-iso-itu-t(2) member-body(2) us(840) x9cm(10040) 2}

-- ANSI X9 holdinstructions

id-holdinstruction-none OBJECT IDENTIFIER  ::=
                                      {holdInstruction 1} -- deprecated

id-holdinstruction-callissuer OBJECT IDENTIFIER ::= {holdInstruction 2}

id-holdinstruction-reject OBJECT IDENTIFIER ::= {holdInstruction 3}










Cooper, et al.              Standards Track                   [Page 132]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


-- invalidity date CRL entry extension OID and syntax

id-ce-invalidityDate OBJECT IDENTIFIER ::= { id-ce 24 }

InvalidityDate ::=  GeneralizedTime

END

Appendix B.  ASN.1 Notes

   CAs MUST force the serialNumber to be a non-negative integer, that
   is, the sign bit in the DER encoding of the INTEGER value MUST be
   zero.  This can be done by adding a leading (leftmost) `00'H octet if
   necessary.  This removes a potential ambiguity in mapping between a
   string of octets and an integer value.

   As noted in Section 4.1.2.2, serial numbers can be expected to
   contain long integers.  Certificate users MUST be able to handle
   serialNumber values up to 20 octets in length.  Conforming CAs MUST
   NOT use serialNumber values longer than 20 octets.

   As noted in Section 5.2.3, CRL numbers can be expected to contain
   long integers.  CRL validators MUST be able to handle cRLNumber
   values up to 20 octets in length.  Conforming CRL issuers MUST NOT
   use cRLNumber values longer than 20 octets.

   The construct "SEQUENCE SIZE (1..MAX) OF" appears in several ASN.1
   constructs.  A valid ASN.1 sequence will have zero or more entries.
   The SIZE (1..MAX) construct constrains the sequence to have at least
   one entry.  MAX indicates that the upper bound is unspecified.
   Implementations are free to choose an upper bound that suits their
   environment.

   The character string type PrintableString supports a very basic Latin
   character set: the lowercase letters 'a' through 'z', uppercase
   letters 'A' through 'Z', the digits '0' through '9', eleven special
   characters ' = ( ) + , - . / : ? and space.

   Implementers should note that the at sign ('@') and underscore ('_')
   characters are not supported by the ASN.1 type PrintableString.
   These characters often appear in Internet addresses.  Such addresses
   MUST be encoded using an ASN.1 type that supports them.  They are
   usually encoded as IA5String in either the emailAddress attribute
   within a distinguished name or the rfc822Name field of GeneralName.
   Conforming implementations MUST NOT encode strings that include
   either the at sign or underscore character as PrintableString.





Cooper, et al.              Standards Track                   [Page 133]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   The character string type TeletexString is a superset of
   PrintableString.  TeletexString supports a fairly standard (ASCII-
   like) Latin character set: Latin characters with non-spacing accents
   and Japanese characters.

   Named bit lists are BIT STRINGs where the values have been assigned
   names.  This specification makes use of named bit lists in the
   definitions for the key usage, CRL distribution points, and freshest
   CRL certificate extensions, as well as the freshest CRL and issuing
   distribution point CRL extensions.  When DER encoding a named bit
   list, trailing zeros MUST be omitted.  That is, the encoded value
   ends with the last named bit that is set to one.

   The character string type UniversalString supports any of the
   characters allowed by [ISO10646].  ISO 10646 is the Universal
   multiple-octet coded Character Set (UCS).

   The character string type UTF8String was introduced in the 1997
   version of ASN.1, and UTF8String was added to the list of choices for
   DirectoryString in the 2001 version of [X.520].  UTF8String is a
   universal type and has been assigned tag number 12.  The content of
   UTF8String was defined by RFC 2044 and updated in RFC 2279, which was
   updated in [RFC3629].

   In anticipation of these changes, and in conformance with IETF Best
   Practices codified in [RFC2277], IETF Policy on Character Sets and
   Languages, this document includes UTF8String as a choice in
   DirectoryString and in the userNotice certificate policy qualifier.

   For many of the attribute types defined in [X.520], the
   AttributeValue uses the DirectoryString type.  Of the attributes
   specified in Appendix A, the name, surname, givenName, initials,
   generationQualifier, commonName, localityName, stateOrProvinceName,
   organizationName, organizationalUnitName, title, and pseudonym
   attributes all use the DirectoryString type.  X.520 uses a
   parameterized type definition [X.683] of DirectoryString to specify
   the syntax for each of these attributes.  The parameter is used to
   indicate the maximum string length allowed for the attribute.  In
   Appendix A, in order to avoid the use of parameterized type
   definitions, the DirectoryString type is written in its expanded form
   for the definition of each of these attribute types.  So, the ASN.1
   in Appendix A describes the syntax for each of these attributes as
   being a CHOICE of TeletexString, PrintableString, UniversalString,
   UTF8String, and BMPString, with the appropriate constraints on the
   string length applied to each of the types in the CHOICE, rather than
   using the ASN.1 type DirectoryString to describe the syntax.





Cooper, et al.              Standards Track                   [Page 134]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   Implementers should note that the DER encoding of the SET OF values
   requires ordering of the encodings of the values.  In particular,
   this issue arises with respect to distinguished names.

   Implementers should note that the DER encoding of SET or SEQUENCE
   components whose value is the DEFAULT omit the component from the
   encoded certificate or CRL.  For example, a BasicConstraints
   extension whose cA value is FALSE would omit the cA boolean from the
   encoded certificate.

   Object Identifiers (OIDs) are used throughout this specification to
   identify certificate policies, public key and signature algorithms,
   certificate extensions, etc.  There is no maximum size for OIDs.
   This specification mandates support for OIDs that have arc elements
   with values that are less than 2^28, that is, they MUST be between 0
   and 268,435,455, inclusive.  This allows each arc element to be
   represented within a single 32-bit word.  Implementations MUST also
   support OIDs where the length of the dotted decimal (see Section 1.4
   of [RFC4512]) string representation can be up to 100 bytes
   (inclusive).  Implementations MUST be able to handle OIDs with up to
   20 elements (inclusive).  CAs SHOULD NOT issue certificates that
   contain OIDs that exceed these requirements.  Likewise, CRL issuers
   SHOULD NOT issue CRLs that contain OIDs that exceed these
   requirements.

   The content-specific rules for encoding GeneralName field values in
   the nameConstraints extension differ from rules that apply in other
   extensions.  In all other certificate, CRL, and CRL entry extensions
   specified in this document the encoding rules conform to the rules
   for the underlying type.  For example, values in the
   uniformResourceIdentifier field must contain a valid URI as specified
   in [RFC3986].  The content-specific rules for encoding values in the
   nameConstraints extension are specified in Section 4.2.1.10, and
   these rules may not conform to the rules for the underlying type.
   For example, when the uniformResourceIdentifier field appears in a
   nameConstraints extension, it must hold a DNS name (e.g.,
   "host.example.com" or ".example.com") rather than a URI.

   Implementors are warned that the X.500 standards community has
   developed a series of extensibility rules.  These rules determine
   when an ASN.1 definition can be changed without assigning a new
   Object Identifier (OID).  For example, at least two extension
   definitions included in [RFC2459], the predecessor to this profile
   document, have different ASN.1 definitions in this specification, but
   the same OID is used.  If unknown elements appear within an
   extension, and the extension is not marked as critical, those unknown
   elements ought to be ignored, as follows:




Cooper, et al.              Standards Track                   [Page 135]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


      (a)  ignore all unknown bit name assignments within a bit string;

      (b)  ignore all unknown named numbers in an ENUMERATED type or
           INTEGER type that is being used in the enumerated style,
           provided the number occurs as an optional element of a SET or
           SEQUENCE; and

      (c)  ignore all unknown elements in SETs, at the end of SEQUENCEs,
           or in CHOICEs where the CHOICE is itself an optional element
           of a SET or SEQUENCE.

   If an extension containing unexpected values is marked as critical,
   the implementation MUST reject the certificate or CRL containing the
   unrecognized extension.

Appendix C.  Examples

   This appendix contains four examples: three certificates and a CRL.
   The first two certificates and the CRL comprise a minimal
   certification path.

   Appendix C.1 contains an annotated hex dump of a "self-signed"
   certificate issued by a CA whose distinguished name is
   cn=Example CA,dc=example,dc=com.  The certificate contains an RSA
   public key, and is signed by the corresponding RSA private key.

   Appendix C.2 contains an annotated hex dump of an end entity
   certificate.  The end entity certificate contains an RSA public key,
   and is signed by the private key corresponding to the "self-signed"
   certificate in Appendix C.1.

   Appendix C.3 contains an annotated hex dump of an end entity
   certificate that contains a DSA public key with parameters, and is
   signed with DSA and SHA-1.  This certificate is not part of the
   minimal certification path.

   Appendix C.4 contains an annotated hex dump of a CRL.  The CRL is
   issued by the CA whose distinguished name is
   cn=Example CA,dc=example,dc=com and the list of revoked certificates
   includes the end entity certificate presented in Appendix C.2.

   The certificates were processed using Peter Gutmann's dumpasn1
   utility to generate the output.  The source for the dumpasn1 utility
   is available at <http://www.cs.auckland.ac.nz/~pgut001/dumpasn1.c>.
   The binaries for the certificates and CRLs are available at
   http://csrc.nist.gov/groups/ST/crypto_apps_infra/documents/pkixtools.





Cooper, et al.              Standards Track                   [Page 136]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   In places in this appendix where a distinguished name is specified
   using a string representation, the strings are formatted using the
   rules specified in [RFC4514].

C.1.  RSA Self-Signed Certificate

   This appendix contains an annotated hex dump of a 578 byte version 3
   certificate.  The certificate contains the following information:

   (a)  the serial number is 17;
   (b)  the certificate is signed with RSA and the SHA-1 hash algorithm;
   (c)  the issuer's distinguished name is
        cn=Example CA,dc=example,dc=com;
   (d)  the subject's distinguished name is
        cn=Example CA,dc=example,dc=com;
   (e)  the certificate was issued on April 30, 2004 and expired on
        April 30, 2005;
   (f)  the certificate contains a 1024-bit RSA public key;
   (g)  the certificate contains a subject key identifier extension
        generated using method (1) of Section 4.2.1.2; and
   (h)  the certificate is a CA certificate (as indicated through the
        basic constraints extension).

   0  574: SEQUENCE {
   4  423:   SEQUENCE {
   8    3:     [0] {
  10    1:       INTEGER 2
         :       }
  13    1:     INTEGER 17
  16   13:     SEQUENCE {
  18    9:       OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
  29    0:       NULL
         :       }
  31   67:     SEQUENCE {
  33   19:       SET {
  35   17:         SEQUENCE {
  37   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  49    3:           IA5String 'com'
         :           }
         :         }
  54   23:       SET {
  56   21:         SEQUENCE {
  58   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  70    7:           IA5String 'example'
         :           }



Cooper, et al.              Standards Track                   [Page 137]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :         }
  79   19:       SET {
  81   17:         SEQUENCE {
  83    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
  88   10:           PrintableString 'Example CA'
         :           }
         :         }
         :       }
 100   30:     SEQUENCE {
 102   13:       UTCTime 30/04/2004 14:25:34 GMT
 117   13:       UTCTime 30/04/2005 14:25:34 GMT
         :       }
 132   67:     SEQUENCE {
 134   19:       SET {
 136   17:         SEQUENCE {
 138   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
 150    3:           IA5String 'com'
         :           }
         :         }
 155   23:       SET {
 157   21:         SEQUENCE {
 159   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
 171    7:           IA5String 'example'
         :           }
         :         }
 180   19:       SET {
 182   17:         SEQUENCE {
 184    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
 189   10:           PrintableString 'Example CA'
         :           }
         :         }
         :       }
 201  159:     SEQUENCE {
 204   13:       SEQUENCE {
 206    9:         OBJECT IDENTIFIER
         :           rsaEncryption (1 2 840 113549 1 1 1)
 217    0:         NULL
         :         }
 219  141:       BIT STRING, encapsulates {
 223  137:         SEQUENCE {
 226  129:           INTEGER
         :             00 C2 D7 97 6D 28 70 AA 5B CF 23 2E 80 70 39 EE
         :             DB 6F D5 2D D5 6A 4F 7A 34 2D F9 22 72 47 70 1D
         :             EF 80 E9 CA 30 8C 00 C4 9A 6E 5B 45 B4 6E A5 E6
         :             6C 94 0D FA 91 E9 40 FC 25 9D C7 B7 68 19 56 8F
         :             11 70 6A D7 F1 C9 11 4F 3A 7E 3F 99 8D 6E 76 A5



Cooper, et al.              Standards Track                   [Page 138]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :             74 5F 5E A4 55 53 E5 C7 68 36 53 C7 1D 3B 12 A6
         :             85 FE BD 6E A1 CA DF 35 50 AC 08 D7 B9 B4 7E 5C
         :             FE E2 A3 2C D1 23 84 AA 98 C0 9B 66 18 9A 68 47
         :             E9
 358    3:           INTEGER 65537
         :           }
         :         }
         :       }
 363   66:     [3] {
 365   64:       SEQUENCE {
 367   29:         SEQUENCE {
 369    3:           OBJECT IDENTIFIER subjectKeyIdentifier (2 5 29 14)
 374   22:           OCTET STRING, encapsulates {
 376   20:             OCTET STRING
         :               08 68 AF 85 33 C8 39 4A 7A F8 82 93 8E 70 6A 4A
         :               20 84 2C 32
         :             }
         :           }
 398   14:         SEQUENCE {
 400    3:           OBJECT IDENTIFIER keyUsage (2 5 29 15)
 405    1:           BOOLEAN TRUE
 408    4:           OCTET STRING, encapsulates {
 410    2:             BIT STRING 1 unused bits
         :               '0000011'B
         :             }
         :           }
 414   15:         SEQUENCE {
 416    3:           OBJECT IDENTIFIER basicConstraints (2 5 29 19)
 421    1:           BOOLEAN TRUE
 424    5:           OCTET STRING, encapsulates {
 426    3:             SEQUENCE {
 428    1:               BOOLEAN TRUE
         :               }
         :             }
         :           }
         :         }
         :       }
         :     }
 431   13:   SEQUENCE {
 433    9:     OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
 444    0:     NULL
         :     }
 446  129:   BIT STRING
         :     6C F8 02 74 A6 61 E2 64 04 A6 54 0C 6C 72 13 AD
         :     3C 47 FB F6 65 13 A9 85 90 33 EA 76 A3 26 D9 FC
         :     D1 0E 15 5F 28 B7 EF 93 BF 3C F3 E2 3E 7C B9 52
         :     FC 16 6E 29 AA E1 F4 7A 6F D5 7F EF B3 95 CA F3



Cooper, et al.              Standards Track                   [Page 139]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :     66 88 83 4E A1 35 45 84 CB BC 9B B8 C8 AD C5 5E
         :     46 D9 0B 0E 8D 80 E1 33 2B DC BE 2B 92 7E 4A 43
         :     A9 6A EF 8A 63 61 B3 6E 47 38 BE E8 0D A3 67 5D
         :     F3 FA 91 81 3C 92 BB C5 5F 25 25 EB 7C E7 D8 A1
         :   }

C.2.  End Entity Certificate Using RSA

   This appendix contains an annotated hex dump of a 629-byte version 3
   certificate.  The certificate contains the following information:

   (a)  the serial number is 18;
   (b)  the certificate is signed with RSA and the SHA-1 hash algorithm;
   (c)  the issuer's distinguished name is
        cn=Example CA,dc=example,dc=com;
   (d)  the subject's distinguished name is
        cn=End Entity,dc=example,dc=com;
   (e)  the certificate was valid from September 15, 2004 through March
        15, 2005;
   (f)  the certificate contains a 1024-bit RSA public key;
   (g)  the certificate is an end entity certificate, as the basic
        constraints extension is not present;
   (h)  the certificate contains an authority key identifier extension
        matching the subject key identifier of the certificate in
        appendix C.1; and
   (i)  the certificate includes one alternative name -- an electronic
        mail address (rfc822Name) of "end.entity@example.com".

   0  625: SEQUENCE {
   4  474:   SEQUENCE {
   8    3:     [0] {
  10    1:       INTEGER 2
         :       }
  13    1:     INTEGER 18
  16   13:     SEQUENCE {
  18    9:       OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
  29    0:       NULL
         :       }
  31   67:     SEQUENCE {
  33   19:       SET {
  35   17:         SEQUENCE {
  37   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  49    3:           IA5String 'com'
         :           }
         :         }
  54   23:       SET {



Cooper, et al.              Standards Track                   [Page 140]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


  56   21:         SEQUENCE {
  58   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  70    7:           IA5String 'example'
         :           }
         :         }
  79   19:       SET {
  81   17:         SEQUENCE {
  83    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
  88   10:           PrintableString 'Example CA'
         :           }
         :         }
         :       }
 100   30:     SEQUENCE {
 102   13:       UTCTime 15/09/2004 11:48:21 GMT
 117   13:       UTCTime 15/03/2005 11:48:21 GMT
         :       }
 132   67:     SEQUENCE {
 134   19:       SET {
 136   17:         SEQUENCE {
 138   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
 150    3:           IA5String 'com'
         :           }
         :         }
 155   23:       SET {
 157   21:         SEQUENCE {
 159   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
 171    7:           IA5String 'example'
         :           }
         :         }
 180   19:       SET {
 182   17:         SEQUENCE {
 184    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
 189   10:           PrintableString 'End Entity'
         :           }
         :         }
         :       }
 201  159:     SEQUENCE {
 204   13:       SEQUENCE {
 206    9:         OBJECT IDENTIFIER
         :           rsaEncryption (1 2 840 113549 1 1 1)
 217    0:         NULL
         :         }
 219  141:       BIT STRING, encapsulates {
 223  137:         SEQUENCE {
 226  129:           INTEGER



Cooper, et al.              Standards Track                   [Page 141]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :             00 E1 6A E4 03 30 97 02 3C F4 10 F3 B5 1E 4D 7F
         :             14 7B F6 F5 D0 78 E9 A4 8A F0 A3 75 EC ED B6 56
         :             96 7F 88 99 85 9A F2 3E 68 77 87 EB 9E D1 9F C0
         :             B4 17 DC AB 89 23 A4 1D 7E 16 23 4C 4F A8 4D F5
         :             31 B8 7C AA E3 1A 49 09 F4 4B 26 DB 27 67 30 82
         :             12 01 4A E9 1A B6 C1 0C 53 8B 6C FC 2F 7A 43 EC
         :             33 36 7E 32 B2 7B D5 AA CF 01 14 C6 12 EC 13 F2
         :             2D 14 7A 8B 21 58 14 13 4C 46 A3 9A F2 16 95 FF
         :             23
 358    3:           INTEGER 65537
         :           }
         :         }
         :       }
 363  117:     [3] {
 365  115:       SEQUENCE {
 367   33:         SEQUENCE {
 369    3:           OBJECT IDENTIFIER subjectAltName (2 5 29 17)
 374   26:           OCTET STRING, encapsulates {
 376   24:             SEQUENCE {
 378   22:               [1] 'end.entity@example.com'
         :               }
         :             }
         :           }
 402   29:         SEQUENCE {
 404    3:           OBJECT IDENTIFIER subjectKeyIdentifier (2 5 29 14)
 409   22:           OCTET STRING, encapsulates {
 411   20:             OCTET STRING
         :               17 7B 92 30 FF 44 D6 66 E1 90 10 22 6C 16 4F C0
         :               8E 41 DD 6D
         :             }
         :           }
 433   31:         SEQUENCE {
 435    3:           OBJECT IDENTIFIER
         :             authorityKeyIdentifier (2 5 29 35)
 440   24:           OCTET STRING, encapsulates {
 442   22:             SEQUENCE {
 444   20:               [0]
         :                 08 68 AF 85 33 C8 39 4A 7A F8 82 93 8E 70 6A
         :                 4A 20 84 2C 32
         :               }
         :             }
         :           }
 466   14:         SEQUENCE {
 468    3:           OBJECT IDENTIFIER keyUsage (2 5 29 15)
 473    1:           BOOLEAN TRUE
 476    4:           OCTET STRING, encapsulates {
 478    2:             BIT STRING 6 unused bits
         :               '11'B



Cooper, et al.              Standards Track                   [Page 142]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :             }
         :           }
         :         }
         :       }
         :     }
 482   13:   SEQUENCE {
 484    9:     OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
 495    0:     NULL
         :     }
 497  129:   BIT STRING
         :     00 20 28 34 5B 68 32 01 BB 0A 36 0E AD 71 C5 95
         :     1A E1 04 CF AE AD C7 62 14 A4 1B 36 31 C0 E2 0C
         :     3D D9 1E C0 00 DC 10 A0 BA 85 6F 41 CB 62 7A B7
         :     4C 63 81 26 5E D2 80 45 5E 33 E7 70 45 3B 39 3B
         :     26 4A 9C 3B F2 26 36 69 08 79 BB FB 96 43 77 4B
         :     61 8B A1 AB 91 64 E0 F3 37 61 3C 1A A3 A4 C9 8A
         :     B2 BF 73 D4 4D E4 58 E4 62 EA BC 20 74 92 86 0E
         :     CE 84 60 76 E9 73 BB C7 85 D3 91 45 EA 62 5D CD
         :   }

C.3.  End Entity Certificate Using DSA

   This appendix contains an annotated hex dump of a 914-byte version 3
   certificate.  The certificate contains the following information:

   (a)  the serial number is 256;

   (b)  the certificate is signed with DSA and the SHA-1 hash algorithm;

   (c)  the issuer's distinguished name is cn=Example DSA
        CA,dc=example,dc=com;

   (d)  the subject's distinguished name is cn=DSA End
        Entity,dc=example,dc=com;

   (e)  the certificate was issued on May 2, 2004 and expired on May 2,
        2005;

   (f)  the certificate contains a 1024-bit DSA public key with
        parameters;

   (g)  the certificate is an end entity certificate (not a CA
        certificate);

   (h)  the certificate includes a subject alternative name of
        "<http://www.example.com/users/DSAendentity.html>" and an issuer
        alternative name of "<http://www.example.com>" -- both are URLs;



Cooper, et al.              Standards Track                   [Page 143]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   (i)  the certificate includes an authority key identifier extension
        and a certificate policies extension specifying the policy OID
        2.16.840.1.101.3.2.1.48.9; and

   (j)  the certificate includes a critical key usage extension
        specifying that the public key is intended for verification of
        digital signatures.

   0  910: SEQUENCE {
   4  846:   SEQUENCE {
   8    3:     [0] {
  10    1:       INTEGER 2
         :       }
  13    2:     INTEGER 256
  17    9:     SEQUENCE {
  19    7:       OBJECT IDENTIFIER dsaWithSha1 (1 2 840 10040 4 3)
         :       }
  28   71:     SEQUENCE {
  30   19:       SET {
  32   17:         SEQUENCE {
  34   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  46    3:           IA5String 'com'
         :           }
         :         }
  51   23:       SET {
  53   21:         SEQUENCE {
  55   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  67    7:           IA5String 'example'
         :           }
         :         }
  76   23:       SET {
  78   21:         SEQUENCE {
  80    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
  85   14:           PrintableString 'Example DSA CA'
         :           }
         :         }
         :       }
 101   30:     SEQUENCE {
 103   13:       UTCTime 02/05/2004 16:47:38 GMT
 118   13:       UTCTime 02/05/2005 16:47:38 GMT
         :       }
 133   71:     SEQUENCE {
 135   19:       SET {
 137   17:         SEQUENCE {
 139   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)



Cooper, et al.              Standards Track                   [Page 144]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


 151    3:           IA5String 'com'
         :           }
         :         }
 156   23:       SET {
 158   21:         SEQUENCE {
 160   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
 172    7:           IA5String 'example'
         :           }
         :         }
 181   23:       SET {
 183   21:         SEQUENCE {
 185    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
 190   14:           PrintableString 'DSA End Entity'
         :           }
         :         }
         :       }
 206  439:     SEQUENCE {
 210  300:       SEQUENCE {
 214    7:         OBJECT IDENTIFIER dsa (1 2 840 10040 4 1)
 223  287:         SEQUENCE {
 227  129:           INTEGER
         :             00 B6 8B 0F 94 2B 9A CE A5 25 C6 F2 ED FC FB 95
         :             32 AC 01 12 33 B9 E0 1C AD 90 9B BC 48 54 9E F3
         :             94 77 3C 2C 71 35 55 E6 FE 4F 22 CB D5 D8 3E 89
         :             93 33 4D FC BD 4F 41 64 3E A2 98 70 EC 31 B4 50
         :             DE EB F1 98 28 0A C9 3E 44 B3 FD 22 97 96 83 D0
         :             18 A3 E3 BD 35 5B FF EE A3 21 72 6A 7B 96 DA B9
         :             3F 1E 5A 90 AF 24 D6 20 F0 0D 21 A7 D4 02 B9 1A
         :             FC AC 21 FB 9E 94 9E 4B 42 45 9E 6A B2 48 63 FE
         :             43
 359   21:           INTEGER
         :             00 B2 0D B0 B1 01 DF 0C 66 24 FC 13 92 BA 55 F7
         :             7D 57 74 81 E5
 382  129:           INTEGER
         :             00 9A BF 46 B1 F5 3F 44 3D C9 A5 65 FB 91 C0 8E
         :             47 F1 0A C3 01 47 C2 44 42 36 A9 92 81 DE 57 C5
         :             E0 68 86 58 00 7B 1F F9 9B 77 A1 C5 10 A5 80 91
         :             78 51 51 3C F6 FC FC CC 46 C6 81 78 92 84 3D F4
         :             93 3D 0C 38 7E 1A 5B 99 4E AB 14 64 F6 0C 21 22
         :             4E 28 08 9C 92 B9 66 9F 40 E8 95 F6 D5 31 2A EF
         :             39 A2 62 C7 B2 6D 9E 58 C4 3A A8 11 81 84 6D AF
         :             F8 B4 19 B4 C2 11 AE D0 22 3B AA 20 7F EE 1E 57
         :             18
         :           }
         :         }
 514  132:       BIT STRING, encapsulates {
 518  128:         INTEGER



Cooper, et al.              Standards Track                   [Page 145]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :           30 B6 75 F7 7C 20 31 AE 38 BB 7E 0D 2B AB A0 9C
         :           4B DF 20 D5 24 13 3C CD 98 E5 5F 6C B7 C1 BA 4A
         :           BA A9 95 80 53 F0 0D 72 DC 33 37 F4 01 0B F5 04
         :           1F 9D 2E 1F 62 D8 84 3A 9B 25 09 5A 2D C8 46 8E
         :           2B D4 F5 0D 3B C7 2D C6 6C B9 98 C1 25 3A 44 4E
         :           8E CA 95 61 35 7C CE 15 31 5C 23 13 1E A2 05 D1
         :           7A 24 1C CB D3 72 09 90 FF 9B 9D 28 C0 A1 0A EC
         :           46 9F 0D B8 D0 DC D0 18 A6 2B 5E F9 8F B5 95 BE
         :         }
         :       }
 649  202:     [3] {
 652  199:       SEQUENCE {
 655   57:         SEQUENCE {
 657    3:           OBJECT IDENTIFIER subjectAltName (2 5 29 17)
 662   50:           OCTET STRING, encapsulates {
 664   48:             SEQUENCE {
 666   46:               [6]
         :                 'http://www.example.com/users/DSAendentity.'
         :                 'html'
         :               }
         :             }
         :           }
 714   33:         SEQUENCE {
 716    3:           OBJECT IDENTIFIER issuerAltName (2 5 29 18)
 721   26:           OCTET STRING, encapsulates {
 723   24:             SEQUENCE {
 725   22:               [6] 'http://www.example.com'
         :               }
         :             }
         :           }
 749   29:         SEQUENCE {
 751    3:           OBJECT IDENTIFIER subjectKeyIdentifier (2 5 29 14)
 756   22:           OCTET STRING, encapsulates {
 758   20:             OCTET STRING
         :               DD 25 66 96 43 AB 78 11 43 44 FE 95 16 F9 D9 B6
         :               B7 02 66 8D
         :             }
         :           }
 780   31:         SEQUENCE {
 782    3:           OBJECT IDENTIFIER
         :             authorityKeyIdentifier (2 5 29 35)
 787   24:           OCTET STRING, encapsulates {
 789   22:             SEQUENCE {
 791   20:               [0]
         :                 86 CA A5 22 81 62 EF AD 0A 89 BC AD 72 41 2C
         :                 29 49 F4 86 56
         :               }
         :             }



Cooper, et al.              Standards Track                   [Page 146]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


         :           }
 813   23:         SEQUENCE {
 815    3:           OBJECT IDENTIFIER certificatePolicies (2 5 29 32)
 820   16:           OCTET STRING, encapsulates {
 822   14:             SEQUENCE {
 824   12:               SEQUENCE {
 826   10:                 OBJECT IDENTIFIER '2 16 840 1 101 3 2 1 48 9'
         :                 }
         :               }
         :             }
         :           }
 838   14:         SEQUENCE {
 840    3:           OBJECT IDENTIFIER keyUsage (2 5 29 15)
 845    1:           BOOLEAN TRUE
 848    4:           OCTET STRING, encapsulates {
 850    2:             BIT STRING 7 unused bits
         :               '1'B (bit 0)
         :             }
         :           }
         :         }
         :       }
         :     }
 854    9:   SEQUENCE {
 856    7:     OBJECT IDENTIFIER dsaWithSha1 (1 2 840 10040 4 3)
         :     }
 865   47:   BIT STRING, encapsulates {
 868   44:     SEQUENCE {
 870   20:       INTEGER
         :         65 57 07 34 DD DC CA CC 5E F4 02 F4 56 42 2C 5E
         :         E1 B3 3B 80
 892   20:       INTEGER
         :         60 F4 31 17 CA F4 CF FF EE F4 08 A7 D9 B2 61 BE
         :         B1 C3 DA BF
         :       }
         :     }
         :   }

C.4.  Certificate Revocation List

   This appendix contains an annotated hex dump of a version 2 CRL with
   two extensions (cRLNumber and authorityKeyIdentifier).  The CRL was
   issued by cn=Example CA,dc=example,dc=com on February 5, 2005; the
   next scheduled issuance was February 6, 2005.  The CRL includes one
   revoked certificate: serial number 18, which was revoked on November
   19, 2004 due to keyCompromise.  The CRL itself is number 12, and it
   was signed with RSA and SHA-1.





Cooper, et al.              Standards Track                   [Page 147]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   0  352: SEQUENCE {
   4  202:   SEQUENCE {
   7    1:     INTEGER 1
  10   13:     SEQUENCE {
  12    9:       OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
  23    0:       NULL
         :       }
  25   67:     SEQUENCE {
  27   19:       SET {
  29   17:         SEQUENCE {
  31   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  43    3:           IA5String 'com'
         :           }
         :         }
  48   23:       SET {
  50   21:         SEQUENCE {
  52   10:           OBJECT IDENTIFIER
         :             domainComponent (0 9 2342 19200300 100 1 25)
  64    7:           IA5String 'example'
         :           }
         :         }
  73   19:       SET {
  75   17:         SEQUENCE {
  77    3:           OBJECT IDENTIFIER commonName (2 5 4 3)
  82   10:           PrintableString 'Example CA'
         :           }
         :         }
         :       }
  94   13:     UTCTime 05/02/2005 12:00:00 GMT
 109   13:     UTCTime 06/02/2005 12:00:00 GMT
 124   34:     SEQUENCE {
 126   32:       SEQUENCE {
 128    1:         INTEGER 18
 131   13:         UTCTime 19/11/2004 15:57:03 GMT
 146   12:         SEQUENCE {
 148   10:           SEQUENCE {
 150    3:             OBJECT IDENTIFIER cRLReason (2 5 29 21)
 155    3:             OCTET STRING, encapsulates {
 157    1:               ENUMERATED 1
         :               }
         :             }
         :           }
         :         }
         :       }
 160   47:     [0] {
 162   45:       SEQUENCE {



Cooper, et al.              Standards Track                   [Page 148]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


 164   31:         SEQUENCE {
 166    3:           OBJECT IDENTIFIER
         :             authorityKeyIdentifier (2 5 29 35)
 171   24:           OCTET STRING, encapsulates {
 173   22:             SEQUENCE {
 175   20:               [0]
         :                 08 68 AF 85 33 C8 39 4A 7A F8 82 93 8E 70 6A
         :                 4A 20 84 2C 32
         :               }
         :             }
         :           }
 197   10:         SEQUENCE {
 199    3:           OBJECT IDENTIFIER cRLNumber (2 5 29 20)
 204    3:           OCTET STRING, encapsulates {
 206    1:             INTEGER 12
         :             }
         :           }
         :         }
         :       }
         :     }
 209   13:   SEQUENCE {
 211    9:     OBJECT IDENTIFIER
         :         sha1withRSAEncryption (1 2 840 113549 1 1 5)
 222    0:     NULL
         :     }
 224  129:   BIT STRING
         :     22 DC 18 7D F7 08 CE CC 75 D0 D0 6A 9B AD 10 F4
         :     76 23 B4 81 6E B5 6D BE 0E FB 15 14 6C C8 17 6D
         :     1F EE 90 17 A2 6F 60 E4 BD AA 8C 55 DE 8E 84 6F
         :     92 F8 9F 10 12 27 AF 4A D4 2F 85 E2 36 44 7D AA
         :     A3 4C 25 38 15 FF 00 FD 3E 7E EE 3D 26 12 EB D8
         :     E7 2B 62 E2 2B C3 46 80 EF 78 82 D1 15 C6 D0 9C
         :     72 6A CB CE 7A ED 67 99 8B 6E 70 81 7D 43 42 74
         :     C1 A6 AF C1 55 17 A2 33 4C D6 06 98 2B A4 FC 2E
         :   }
















Cooper, et al.              Standards Track                   [Page 149]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


Authors' Addresses

   David Cooper
   National Institute of Standards and Technology
   100 Bureau Drive, Mail Stop 8930
   Gaithersburg, MD 20899-8930
   USA
   EMail: david.cooper@nist.gov

   Stefan Santesson
   Microsoft
   One Microsoft Way
   Redmond, WA 98052
   USA
   EMail: stefans@microsoft.com

   Stephen Farrell
   Distributed Systems Group
   Computer Science Department
   Trinity College Dublin
   Ireland
   EMail: stephen.farrell@cs.tcd.ie

   Sharon Boeyen
   Entrust
   1000 Innovation Drive
   Ottawa, Ontario
   Canada K2K 3E7
   EMail: sharon.boeyen@entrust.com

   Russell Housley
   Vigil Security, LLC
   918 Spring Knoll Drive
   Herndon, VA 20170
   USA
   EMail: housley@vigilsec.com

   Tim Polk
   National Institute of Standards and Technology
   100 Bureau Drive, Mail Stop 8930
   Gaithersburg, MD 20899-8930
   USA
   EMail: wpolk@nist.gov








Cooper, et al.              Standards Track                   [Page 150]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


Full Copyright Statement

   Copyright (C) The IETF Trust (2008).

   This document is subject to the rights, licenses and restrictions
   contained in BCP 78, and except as set forth therein, the authors
   retain all their rights.

   This document and the information contained herein are provided on an
   "AS IS" basis and THE CONTRIBUTOR, THE ORGANIZATION HE/SHE REPRESENTS
   OR IS SPONSORED BY (IF ANY), THE INTERNET SOCIETY, THE IETF TRUST AND
   THE INTERNET ENGINEERING TASK FORCE DISCLAIM ALL WARRANTIES, EXPRESS
   OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTY THAT THE USE OF
   THE INFORMATION HEREIN WILL NOT INFRINGE ANY RIGHTS OR ANY IMPLIED
   WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.

Intellectual Property

   The IETF takes no position regarding the validity or scope of any
   Intellectual Property Rights or other rights that might be claimed to
   pertain to the implementation or use of the technology described in
   this document or the extent to which any license under such rights
   might or might not be available; nor does it represent that it has
   made any independent effort to identify any such rights.  Information
   on the procedures with respect to rights in RFC documents can be
   found in BCP 78 and BCP 79.

   Copies of IPR disclosures made to the IETF Secretariat and any
   assurances of licenses to be made available, or the result of an
   attempt made to obtain a general license or permission for the use of
   such proprietary rights by implementers or users of this
   specification can be obtained from the IETF on-line IPR repository at
   http://www.ietf.org/ipr.

   The IETF invites any interested party to bring to its attention any
   copyrights, patents or patent applications, or other proprietary
   rights that may cover technology that may be required to implement
   this standard.  Please address the information to the IETF at
   ietf-ipr@ietf.org.












Cooper, et al.              Standards Track                   [Page 151]

			15.1.1.3
		15.1.2

	15.2
```
